import { NextResponse } from "next/server";
import { getUserMeLoader } from "@/data/services/get-user-me-loader";

export async function middleware(request) {
    const user = await getUserMeLoader();
    const currentPath = request.nextUrl.pathname;

    if (currentPath.startsWith("/profil") && user.ok === false) {
        return NextResponse.redirect(new URL("/logowanie", request.url));
    }

    return NextResponse.next();
}
