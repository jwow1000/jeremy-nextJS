import Link from "next/link";
import { ReactNode } from "react";

interface AppLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  newWindow?: boolean;
}

export default function AppLink({
  href,
  children,
  className,
  newWindow = false,
}: AppLinkProps) {
  return (
    <Link
      href={href}
      className={`text-left border border-[0.5px] p-1 w-20 hover:bg-white-500/100 hover:text-[var(--pink)] ${
        className ?? ""
      }`}
      {...(newWindow ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </Link>
  );
}
