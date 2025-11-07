import React from 'react';

type FancyLinkProps = React.PropsWithChildren<{
  href: string;
  className?: string;
  target?: string;
  rel?: string;
}>;

export default function FancyLink({
  href,
  children,
  className = "",
  target,
  rel,
}: FancyLinkProps) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={`
      relative transition-all duration-300 ease-in-out hover:translate-x-0.5 hover:text-accent-foreground
      after:content-[''] after:absolute after:w-0 after:h-px after:-bottom-0.5 after:left-0 
      after:bg-blue-600 dark:after:bg-blue-400 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full
      ${className}
    `}
    >
      {children}
    </a>
  );
}

