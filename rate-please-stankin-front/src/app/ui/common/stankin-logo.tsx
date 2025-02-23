import Image from "next/image";
import {ImageSize} from "@/app/lib/api/ui-interfaces";

export default function StankinLogo(props: ImageSize) {
    return (
        <div
            className={`flex flex-row items-center justify-center leading-none text-white mb-8`}
        >
            <Image
                src={"/login/logo_ru.svg"}
                alt={"Логотип МГТУ СТАНКИН"}
                width={props.width}
                height={props.height}
            />
        </div>
    );
}
