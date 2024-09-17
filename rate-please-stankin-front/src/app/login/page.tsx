import LoginForm from "@/app/ui/login/login-form";
import LoginBackgroundImage from "@/app/ui/login/login-background-image";
import Image from "next/image";


export default function LoginPage() {
    return (
        <main className="flex items-center justify-center md:h-screen">
            <div >
                <div>

                    <LoginForm/>

                </div>
                <LoginBackgroundImage/>
            </div>

        </main>
    );
}


