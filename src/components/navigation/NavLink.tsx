'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import type {ReactNode} from 'react';

type NavLinkProps = {
  href: string;
  className?: string;
  activeClassName?: string;
  inactiveClassName?: string;
  onClick?: () => void;
  children: ReactNode;
};

export default function NavLink({
  href,
  className,
  activeClassName,
  inactiveClassName,
  onClick,
  children,
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  const mergedClassName = [
    className,
    isActive ? activeClassName : inactiveClassName,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Link href={href} className={mergedClassName} onClick={onClick}>
      {children}
    </Link>
  );
}
