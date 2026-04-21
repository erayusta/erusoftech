import { cn } from '@/lib/cn';

type Props = React.HTMLAttributes<HTMLSpanElement>;

export function GradientText({ className, children, ...rest }: Props) {
  return (
    <span className={cn('gradient-text', className)} {...rest}>
      {children}
    </span>
  );
}
