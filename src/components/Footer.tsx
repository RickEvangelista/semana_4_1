import React from "react";
import Image from "next/image";

function Footer() {
    return (
        <footer className="w-full h fit flex justify-between md:p-4">
            <Image
                src={"/icon.svg"}
                width={160}
                height={160}
                alt={"Imagem da logo"}
            />{" "}
            <Image
                src={"/competicao_invert.svg"}
                width={160}
                height={160}
                alt={"Logo"}
            />{" "}
            <Image src={"/avatar.svg"} width={120} height={120} alt={"Logo"} />
        </footer>
    );
}

export default Footer;
