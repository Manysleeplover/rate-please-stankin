'use client' // Убедитесь, что компонент является клиентским

import {useSession} from "next-auth/react";
import {signIn} from "@/auth";

export default function Page() {
    const { data: session, status } = useSession()
    if (status === "loading") {
        return <p>Loading...</p>
    }
    return (
        <>
            <p>Signed in as {session.user.id}</p>
            <p>Signed in as {session.user.role}</p>
            <p>Signed in as {session.user.name}</p>
            <p>Signed in as {session.user.email}</p>
            <p>Signed in as {session.user.token}</p>
        </>
    )
}