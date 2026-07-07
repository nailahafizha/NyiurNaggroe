import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet: any[]) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Protected routes — require login.
  // NOTE: these must match the ACTUAL Indonesian route names used in this
  // app (previously this list had English names like "/orders"/"/account"
  // which don't exist here, so /pesanan and /akun were silently NOT
  // protected at all).
  const protectedPatterns = [
    "/akun",
    "/wishlist",
    "/pesanan",
    "/keranjang",
    "/checkout",
    "/mitra",
    "/daftar-mitra",
    "/edukasi/kuis",
  ];

  const isProtectedRoute = protectedPatterns.some((pattern) =>
    request.nextUrl.pathname.startsWith(pattern)
  );

  // Human-readable reason per route, shown on the login page so people
  // understand *why* they were sent there instead of just landing on a
  // blank login form.
  const getAuthReason = (pathname: string) => {
    if (pathname.startsWith("/keranjang")) return "keranjang";
    if (pathname.startsWith("/wishlist")) return "wishlist";
    if (pathname.startsWith("/checkout")) return "checkout";
    if (pathname.startsWith("/pesanan")) return "pesanan";
    if (pathname.startsWith("/daftar-mitra")) return "jualan";
    if (pathname.startsWith("/mitra")) return "mitra";
    if (pathname.startsWith("/edukasi/kuis")) return "kuis";
    return "umum";
  };

  // Seller-only routes
  const sellerPatterns = ["/mitra"];
  const isSellerRoute = sellerPatterns.some((pattern) =>
    request.nextUrl.pathname.startsWith(pattern)
  );

  // Admin-only routes
  const adminPatterns = ["/admin"];
  const isAdminRoute = adminPatterns.some((pattern) =>
    request.nextUrl.pathname.startsWith(pattern)
  );

  // Check if mock session exists
  const hasMockSession = request.cookies.has("nyiur_mock_session");
  const mockRole = request.cookies.get("nyiur_mock_role")?.value || "user";

  const isAuthorized = user || hasMockSession;

  if (!isAuthorized && isProtectedRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/masuk";
    redirectUrl.searchParams.set("redirect", request.nextUrl.pathname);
    redirectUrl.searchParams.set("alasan", getAuthReason(request.nextUrl.pathname));
    return NextResponse.redirect(redirectUrl);
  }

  // Admin role guard
  if (isAuthorized && isAdminRoute) {
    const isAdmin = (user && user.app_metadata?.role === "admin") || mockRole === "admin";
    if (!isAdmin) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = "/";
      return NextResponse.redirect(redirectUrl);
    }
  }

  // Seller role guard
  if (isAuthorized && isSellerRoute) {
    const isSeller = (user && user.app_metadata?.role === "seller") || mockRole === "seller" || mockRole === "admin";
    if (!isSeller) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = "/daftar-mitra";
      return NextResponse.redirect(redirectUrl);
    }
  }

  if (isAuthorized && (request.nextUrl.pathname === "/masuk" || request.nextUrl.pathname === "/daftar")) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/";
    return NextResponse.redirect(redirectUrl);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
