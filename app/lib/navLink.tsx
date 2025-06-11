'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";


type NavLinkProps = {
  href: string
  className: string
  activeClassName: string
  children: React.ReactNode
}

export default function NavLink({href, className, activeClassName, children}: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;
  const nameIt = isActive ? `${className} ${activeClassName}` : `${className}`;

  return (
    <Link
      href={href}
      className={nameIt}
    >
      {children}
    </Link>
  )
}