import LoginBackgroundImage from "@/app/ui/login/login-background-image";
import StankinLogo from "@/app/ui/common/stankin-logo";
import SignUpForm from "@/app/ui/login/sign-up-form";


export default function SignUpPage() {
    return (
        <main className="flex   justify-center md:h-screen">
            <div>
                <StankinLogo width={300} height={300} />
                <div>
                    <SignUpForm/>
                </div>
                <LoginBackgroundImage/>
            </div>

        </main>
    );
}


