import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/dashboard', nextUrl));
            }
            return true;
        },
        callbacks: {
            jwt({ token, user }) {
                if (user) { // User is available during sign-in
                    token.id = user.id
                }
                return token
            },
            session({ session, token }) {
                session.user.id = token.id
                return session
            },
        },
    },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;