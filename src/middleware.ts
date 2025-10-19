import { getCookieCache } from "better-auth/cookies";
import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
	const session = await getCookieCache(request);
	if (!session) {
		console.log("cookie check");
		return NextResponse.redirect(new URL("/login", request.url));
	}
	return NextResponse.next();
}

export const config = {
	matcher: ["/admin/:path*"],
};
