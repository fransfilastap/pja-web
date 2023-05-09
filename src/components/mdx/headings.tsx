import { ComponentProps } from "react";

export function H1({ children, ...props }: ComponentProps<"h1">) {
  return (
    <h1 className="text-2xl font-bold text-black" {...props}>
      {children}
    </h1>
  );
}

export function H2({ children, ...props }: ComponentProps<"h2">) {
  return (
    <h2 className="text-xl font-bold text-black" {...props}>
      {children}
    </h2>
  );
}

export function H3({ children, ...props }: ComponentProps<"h3">) {
  return (
    <h3 className="text-lg font-bold text-black" {...props}>
      {children}
    </h3>
  );
}

export function H4({ children, ...props }: ComponentProps<"h4">) {
  return (
    <h4 className="text-base font-bold text-black" {...props}>
      {children}
    </h4>
  );
}

export function H5({ children, ...props }: ComponentProps<"h5">) {
  return (
    <h5 className="text-sm font-bold text-black" {...props}>
      {children}
    </h5>
  );
}

export function H6({ children, ...props }: ComponentProps<"h5">) {
  return (
    <h6 className="font-bold text-black" {...props}>
      {children}
    </h6>
  );
}
