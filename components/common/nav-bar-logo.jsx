// filepath: components/common/navigation/NavLogo.js
import logo from "@/public/logo.png";
import Image from "next/image";
import Link from "next/link";

export default function NavLogo() {
  return (
    <Link href="/">
      <div className="flex items-center gap-2">
        <Image
          src={logo || "/placeholder.svg"}
          alt="Thirty Mighty Men Ministries Logo"
          width={35}
          height={35}
        />
        <Image
          src="/images-2/Thirty Mighty Men Ministries - text logo.png"
          alt="Thirty Mighty Men Ministries Logo"
          className="h-fit w-auto max-w-[175px]"
          width={602}
          height={169}
          priority
        />
      </div>
    </Link>
  );
}
