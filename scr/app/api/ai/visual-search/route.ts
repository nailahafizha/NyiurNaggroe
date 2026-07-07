import { NextRequest, NextResponse } from "next/server";
import { analyzeProductImage } from "@/lib/ai/gemini";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const imageFile = formData.get("image") as File;

    if (!imageFile) {
      return NextResponse.json(
        { error: "Image file is required" },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(imageFile.type)) {
      return NextResponse.json(
        { error: "Format file tidak didukung. Gunakan JPG, PNG, atau WebP." },
        { status: 400 }
      );
    }

    // Validate file size (5MB max)
    if (imageFile.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Ukuran file terlalu besar. Maksimal 5MB." },
        { status: 400 }
      );
    }

    // Convert to base64
    const arrayBuffer = await imageFile.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");

    // Analyze with Gemini Vision
    const analysis = await analyzeProductImage(base64, imageFile.type);

    // Search for matching products in Supabase
    const supabase = await createClient();

    const { data: products, error } = await supabase
      .from("products")
      .select(`
        *,
        store:stores(id, name, slug, location, is_verified),
        category:categories(id, name, slug, icon),
        images:product_images(url, is_primary)
      `)
      .textSearch("fts", analysis.search_query, {
        type: "websearch",
        config: "indonesian",
      })
      .eq("is_active", true)
      .order("rating", { ascending: false })
      .limit(12);

    if (error) {
      console.error("[Visual Search] DB Error:", error);
    }

    // Fallback: search by tags if full-text search fails
    let finalProducts = products ?? [];
    if (finalProducts.length === 0 && analysis.tags.length > 0) {
      const { data: tagProducts } = await supabase
        .from("products")
        .select(`
          *,
          store:stores(id, name, slug, location, is_verified),
          category:categories(id, name, slug, icon),
          images:product_images(url, is_primary)
        `)
        .contains("tags", [analysis.tags[0]])
        .eq("is_active", true)
        .limit(12);

      finalProducts = tagProducts ?? [];
    }

    return NextResponse.json({
      analysis,
      products: finalProducts,
      total: finalProducts.length,
    });
  } catch (error) {
    console.error("[Visual Search]", error);
    return NextResponse.json(
      { error: "Gagal menganalisis gambar. Silakan coba lagi." },
      { status: 500 }
    );
  }
}
