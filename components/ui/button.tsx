import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-transparent text-sm font-medium transition-colors duration-200 outline-none disabled:pointer-events-none disabled:opacity-50 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow-[0_8px_18px_rgba(42,54,61,0.12)] hover:bg-white',
        destructive:
          'bg-destructive text-white shadow-[0_8px_18px_rgba(122,47,43,0.18)] hover:bg-destructive/90 focus-visible:ring-destructive/20',
        outline: 'border-white/18 bg-white/8 text-white hover:bg-white/16 hover:text-white',
        secondary: 'bg-[#60737e]/74 text-secondary-foreground hover:bg-[#dfe5ed] hover:text-[#314049]',
        ghost: 'bg-transparent text-white/70 hover:bg-white/10 hover:text-white',
        link: 'text-primary underline-offset-4 hover:underline'
      },
      size: {
        default: 'h-11 px-5 py-2.5 has-[>svg]:px-4',
        sm: 'h-9 px-4 text-xs has-[>svg]:px-3.5',
        lg: 'h-12 px-7 text-base has-[>svg]:px-5',
        icon: 'size-11',
        'icon-sm': 'size-9',
        'icon-lg': 'size-12'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
