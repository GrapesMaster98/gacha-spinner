import { withAuth } from "@kinde-oss/kinde-auth-nextjs/server";

export default withAuth(
    async function middleware() {

    },
    {
        publicPaths: ['/', '/api/pull', '/api/items'],
    }
);

export const config = {
    matcher: [
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    ]
}