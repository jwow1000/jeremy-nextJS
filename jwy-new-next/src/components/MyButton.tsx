import { ReactNode } from "react";

interface MyButtonProps {
  children: ReactNode;
  className?: string;
  state?: boolean;
  onClick?: () => void;
}

export default function MyButton({
  children,
  className,
  state = false,
  onClick,

}: MyButtonProps) {
  return (
    <button 
      type="button"
      onClick={onClick}
      className={`
        ${state ? 'bg-[var(--hilite)] text-black hover:text-grey' : 'bg-none hover:text-[var(--hilite)]'}
        text-left border border-[0.5px] p-1 w-24 cursor-pointer  
        ${className ?? ""}
      `}
    >
      {children}
    </button>
  )

}
