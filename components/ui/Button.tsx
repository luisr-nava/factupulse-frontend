import { Button, ButtonProps } from "antd"

type CustomButtonProps = ButtonProps & {
  children: React.ReactNode;
};

export default function CustomButton({ children, ...rest }: CustomButtonProps) {
  return <Button {...rest}>{children}</Button>;
}

