import { Button } from "antd";
import type { ButtonProps } from "antd";
import { ReactNode } from "react";

interface AppButtonProps extends ButtonProps {
  children: ReactNode;
  className?: string;
}

export default function AppButton({
  children,
  className = "",
  ...props
}: AppButtonProps) {
  return (
    <Button
      {...props}
      className={`
      bg-primary  text-white font-semibold  hover:!bg-primary-400 hover:!text-white transition-all duration-500 !border-none px-2
      ${className}
    
    `}>
      {children}
    </Button>
  );
}



