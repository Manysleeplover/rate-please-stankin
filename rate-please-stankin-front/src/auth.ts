import NextAuth from 'next-auth';
import {authConfig} from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import {z} from 'zod';
import {singInAPIRequest} from "@/app/lib/api/login-form-api";
import {JwtAuthenticationResponse} from "@/app/lib/api/ui-interfaces";


export const { auth, signIn, signOut, handlers } = NextAuth({
    ...authConfig,
    providers: [Credentials({
        async authorize(credentials){

            const parsedCredentials = z
                .object({ username: z.string(), password: z.string().min(6) })
                .safeParse(credentials);

            const {username, password} = parsedCredentials.data

            const user: JwtAuthenticationResponse | string = await singInAPIRequest({username, password})

            if (!user) {
                console.log('Invalid credentials');
                return null;
            }
            else return user
        }
    })],
});