"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { Button } from "@/components/ui/button";

type BtnProps = ComponentProps<typeof Button>;
type Variant = "primary" | "ghost" | "outline";

type MarketingButtonProps = Omit<BtnProps, "variant" | "render"> & {
  href?: string;
  variant?: Variant;
};

export function MarketingButton({
  href,
  variant = "primary",
  className,
  children,
  onClick,
  ...rest
}: MarketingButtonProps) {
  const v = variant === "primary" ? "default" : variant;
  if (href) {
    return (
      <Button
        className={className}
        variant={v}
        render={
          <Link
            href={href}
            onClick={
              onClick as React.MouseEventHandler<HTMLAnchorElement> | undefined
            }
          />
        }
        {...rest}
      >
        {children}
      </Button>
    );
  }
  return (
    <Button className={className} variant={v} onClick={onClick} {...rest}>
      {children}
    </Button>
  );
}
