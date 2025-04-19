'use client'

import LoginForm from "@/app/ui/login/login-form";
import LoginBackgroundImage from "@/app/ui/login/login-background-image";
import StankinLogo from "@/app/ui/common/stankin-logo";
import {Suspense} from 'react';


export default function SignInPage() {


    return (
        <main className="flex   justify-center md:h-screen">
            <div>
                <StankinLogo width={300} height={300} />
                <div>
                    <Suspense>
                        <LoginForm/>
                    </Suspense>
                </div>
                <LoginBackgroundImage/>
            </div>

        </main>
    );
}


