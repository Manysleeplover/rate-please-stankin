import Image from "next/image";

export default function StankinLogo() {
    return (
        <div
            className={`flex flex-row items-center justify-center leading-none text-white mb-8`}
        >
            <Image
                src={"/login/logo_ru.svg"}
                alt={"Логотип МГТУ СТАНКИН"}
                width={300}
                height={300}
            />
        </div>
    );
}
