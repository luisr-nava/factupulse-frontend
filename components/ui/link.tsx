"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import NextLink from "next/link";

const linkVariants = cva("transition-all font-medium", {
  variants: {
    variant: {
      ghost: "hover:text-primary-600 hover:scale-105",
      button:
        "bg-primary rounded-2xl text-white hover:bg-primary hover:text-white px-4 py-2 hover:scale-105",
    },
  },
  defaultVariants: {
    variant: "ghost",
  },
});

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkVariants> {
  asChild?: boolean;
  href: string;
}

const AppLink = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant, asChild = false, href, ...props }, ref) => {
    const Comp = asChild ? Slot : "a";

    return (
      <NextLink href={href} legacyBehavior passHref>
        <Comp
          ref={ref}
          className={cn(linkVariants({ variant }), className)}
          {...props}
        />
      </NextLink>
    );
  },
);

AppLink.displayName = "AppLink";

export { AppLink, linkVariants };

