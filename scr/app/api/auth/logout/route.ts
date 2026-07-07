import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { signOut } from "@/lib/services/auth.service";
import { ok, handleError } from "@/lib/utils/api-response";

export async function POST(_req: NextRequest) {
  try {
    await signOut();

    // Clear role cookie
    const cookieStore = await cookies();
    cookieStore.delete("nyiur_mock_role");
    cookieStore.delete("nyiur_mock_session");

    return ok({ loggedOut: true }, { message: "Berhasil keluar" });
  } catch (error) {
    return handleError(error);
  }
}
