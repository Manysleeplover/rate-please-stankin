'use client' // Убедитесь, что компонент является клиентским

import {getProviders, useSession} from "next-auth/react";
import {signIn, signOut} from "@/auth";
import {useProviderContext} from "@nextui-org/system";

export default function Page() {
    const { data: session, status } = useSession()




    if (status === "loading") {
        return <p>Loading...</p>
    }

    if (status === "unauthenticated") {
        return (
            <>
                <p>Not signed in</p>
                <button onClick={() => signIn()}>Sign in</button>
            </>
        )
    }

    return (
        <>
            <p>Signed in as {session.user.email}</p>
            <button onClick={() => signOut()}>Sign out</button>
        </>
    )
}