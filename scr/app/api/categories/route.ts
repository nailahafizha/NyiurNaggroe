import { NextRequest } from "next/server";
import { createRouteClient } from "@/lib/utils/auth-helpers";
import { ok, handleError } from "@/lib/utils/api-response";

export async function GET(_req: NextRequest) {
  try {
    const supabase = await createRouteClient();

    const { data, error } = await supabase
      .from("categories")
      .select("id, name, name_en, slug, description, icon, image_url, parent_id, sort_order, product_count")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (error) throw error;

    return ok(data ?? []);
  } catch (error) {
    return handleError(error);
  }
}
