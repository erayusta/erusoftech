import { cn } from '@/lib/cn';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  size?: 'default' | 'wide' | 'narrow';
};

export function Container({ className, size = 'default', ...props }: Props) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-6 md:px-8',
        size === 'default' && 'max-w-6xl',
        size === 'wide' && 'max-w-7xl',
        size === 'narrow' && 'max-w-4xl',
        className,
      )}
      {...props}
    />
  );
}
