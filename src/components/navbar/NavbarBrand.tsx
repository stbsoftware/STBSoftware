import Image from "next/image";
import Link from "next/link";
import logo from "@/img/STB_logo.png";
import { logoImageClassName, logoLinkClassName } from "./nav-styles";

type NavbarBrandProps = {
  onNavigate: () => void;
};

export function NavbarBrand({ onNavigate }: NavbarBrandProps) {
  return (
    <Link href="/" className={logoLinkClassName} onClick={onNavigate}>
      <Image
        src={logo}
        alt="STB Software"
        width={640}
        height={200}
        priority
        className={logoImageClassName}
      />
    </Link>
  );
}
