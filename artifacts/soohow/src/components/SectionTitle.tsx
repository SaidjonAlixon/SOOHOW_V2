import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { splitTitleLines } from "@/lib/splitTitleLines";

type SectionTitleProps = {
  children: string;
  className?: string;
  lineClassName?: string;
};

/** Multi-line section heading with uniform font size on every line. */
export const SectionTitle = forwardRef<HTMLHeadingElement, SectionTitleProps>(
  function SectionTitle({ children, className, lineClassName }, ref) {
    const lines = splitTitleLines(children);

    return (
      <h2 ref={ref} className={cn("site-section-title", className)}>
        {lines.map((line) => (
          <span key={line} className={cn("site-section-title__line", lineClassName)}>
            {line}
          </span>
        ))}
      </h2>
    );
  },
);
