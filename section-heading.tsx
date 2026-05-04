import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  theme?: 'light' | 'dark';
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  align = 'center',
  theme = 'light',
  className,
}: SectionHeadingProps) {
  const alignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }[align];

  const titleColor = theme === 'dark' ? 'text-white' : 'text-charcoal';
  const subtitleColor = theme === 'dark' ? 'text-white/70' : 'text-body/70';

  return (
    <div className={cn('mb-10 md:mb-14', alignClass, className)}>
      <h2
        className={cn(
          'font-display text-3xl md:text-4xl lg:text-[2.625rem] font-semibold leading-tight',
          titleColor
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'mt-3 text-base md:text-lg font-sans leading-relaxed max-w-2xl',
            align === 'center' && 'mx-auto',
            subtitleColor
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
