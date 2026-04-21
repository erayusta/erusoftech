import * as React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'md' | 'lg';

type CommonProps = {
  variant?: Variant;
  size?: Size;
  icon?: boolean;
  className?: string;
  children: React.ReactNode;
};

type ButtonProps = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type LinkProps = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
    href: string;
  };

type Props = ButtonProps | LinkProps;

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

export function Button(props: Props) {
  const { variant = 'primary', size = 'md', icon, className, children, ...rest } = props;

  const content = (
    <>
      <span>{children}</span>
      {icon && (
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
      )}
    </>
  );

  const classes = cn(base, variantStyles[variant], sizeStyles[size], className);

  if ('href' in props && props.href) {
    const { href, ...anchorProps } = rest as Omit<LinkProps, keyof CommonProps>;
    return (
      <Link href={href} className={classes} {...anchorProps}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  );
}
