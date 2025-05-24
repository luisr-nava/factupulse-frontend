import Link from "next/link";

interface LinkButtonProps extends React.ComponentPropsWithoutRef<typeof Link> {
  isLink?: boolean;
  className?: string;
  children: React.ReactNode;
}

export default function LinkButton({
  isLink = false,
  className = "",
  href,
  children,
  ...props
}: LinkButtonProps) {
  const baseStyles =
    "text-white hover:text-white text-lg rounded-xl transition-all duration-500";
    
  const interactiveStyles = isLink
    ? "!text-primary !dark:text-white"
    : "bg-primary dark:bg-primary-600 px-4 py-2 hover:scale-105";

  return (
    <Link
      href={href}
      className={`${baseStyles} ${interactiveStyles} ${className} dark:hover:text-white font-semibold`}
      {...props} 
    >
      {children}
    </Link>
  );
}


