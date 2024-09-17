import Image from "next/image";

export default function LoginBackgroundImage() {
    return (
        <Image
            src="/login/Stankin_build.jpg"
            layout="fill"
            className="blur-sm brightness-150 contrast-100 saturate-100 fixed -z-40 hidden md:block"
            alt="Представление главного экрана"
        />
    )
}