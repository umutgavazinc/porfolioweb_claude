import { ReactNode, CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  as?: "div" | "section" | "main" | "header" | "footer" | "article";
}

export default function Container({
  children,
  className,
  style,
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag className={cn("container-site", className)} style={style}>
      {children}
    </Tag>
  );
}
