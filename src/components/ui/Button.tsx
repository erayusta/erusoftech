import * as React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'md' | 'lg';

const base =
  'group inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950';

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-gradient-brand text-white shadow-glow-sm hover:shadow-glow hover:-translate-y-0.5',
  secondary:
    'glass-strong text-white hover:bg-white/10 hover:border-white/20 hover:-translate-y-0.5',
  ghost: 'text-white/80 hover:text-white hover:bg-white/5',
};

const sizeStyles: Record<Size, string> = {
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
};

type BaseProps = {
  variant?: Variant;
  size?: Size;
  icon?: boolean;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: undefined;
  };

type ButtonAsLink = BaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps | 'href'> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', icon, className, children } = props;
  const classes = cn(base, variantStyles[variant], sizeStyles[size], className);

  const content = (
    <>
      <span>{children}</span>
      {icon && (
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
      )}
    </>
  );

  if ('href' in props && props.href) {
    const { href, variant: _v, size: _s, icon: _i, className: _c, children: _ch, ...anchorRest } =
      props;
    return (
      <Link href={href} className={classes} {...anchorRest}>
        {content}
      </Link>
    );
  }

  const { variant: _v, size: _s, icon: _i, className: _c, children: _ch, href: _h, ...buttonRest } =
    props as ButtonAsButton;
  return (
    <button className={classes} {...buttonRest}>
      {content}
    </button>
  );
}
