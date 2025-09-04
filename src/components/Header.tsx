import { Perfil } from "@/types/userRole";
import Link from "next/link";
import Image from "next/image";
import React from "react";

interface HeaderProps {
  isLoggedIn: boolean;
  userRole?: Perfil;
}

const menuLinks: Record<Perfil, { href: string; label: string }[]> = {
  administrador: [
    { href: "/dashboard/eventos", label: "Eventos" },
    { href: "/dashboard/setores", label: "Setores" },
    { href: "/dashboard/usuarios", label: "Usuários" },
    { href: "/dashboard/ingressos", label: "Ingressos" },
    { href: "/dashboard/validacao", label: "Validação" },
    { href: "/dashboard/relatorios", label: "Relatórios" },
  ],
  vendedor: [],
  validador: [],
};

const initialPage: Record<Perfil, string> = {
  administrador: "/dashboard",
  vendedor: "/dashboard/ingressos",
  validador: "/dashboard/validacao",
};

function Header({ isLoggedIn, userRole }: HeaderProps) {
  const links = userRole ? menuLinks[userRole] : [];

  const logoLink = isLoggedIn && userRole ? initialPage[userRole] : "/";

  return (
    <header className="flex w-full items-center p-5 justify-between">
      <nav className="flex w-full justify-between items-center">
        <Link href={logoLink}>
          <Image
            src={"/vertical_logo.svg"}
            width={200}
            height={140}
            alt={"Logo"}
          />
        </Link>
        {links.length > 0 && (
          <ul className="flex gap-5">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-custom-dark-gray hover:text-custom-blue transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
        {isLoggedIn ? (
          <Link href={"/dashboard/perfil"}>
            <Image
              src={"/profile.svg"}
              width={80}
              height={80}
              alt="Perfil de Usuario"
            />
          </Link>
        ) : (
          <Link href={"/login"}>
            <Image
              src={"/logo_invert.svg"}
              width={120}
              height={120}
              alt={"Logo"}
            />
          </Link>
        )}
      </nav>
    </header>
  );
}

export default Header;
