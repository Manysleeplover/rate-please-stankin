'use client'

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function OauthForm() {
    const [code, setCode] = useState<string | null>(null);
    const searchParams = useSearchParams();

    useEffect(() => {
        const codeParam = searchParams.get("code");
        setCode(codeParam);
    }, [searchParams]);

    return (
        <>
            {code && (
                <div>
                    {code}
                </div>
            )}

            <div className="min-h-screen bg-gray-100 py-12">
                <a
                    href={
                        "https://lk.stankin.ru/webapi/oauth/authorize?response_type=code&client_id=rate-please-stankin&redirect_uri=http://localhost:3030/dashboard/mj-oauth"
                    }
                >
                    Войти в модульный журнал
                </a>
            </div>
        </>
    );
}