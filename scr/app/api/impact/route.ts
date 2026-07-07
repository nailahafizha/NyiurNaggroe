import { NextRequest } from "next/server";
import { createRouteClient } from "@/lib/utils/auth-helpers";
import { ok, handleError } from "@/lib/utils/api-response";

export async function GET(_req: NextRequest) {
  try {
    const supabase = await createRouteClient();

    const { data, error } = await supabase
      .from("environmental_impacts")
      .select("*")
      .limit(1)
      .single();

    if (error) throw error;

    return ok(data);
  } catch (error) {
    return handleError(error);
  }
}
