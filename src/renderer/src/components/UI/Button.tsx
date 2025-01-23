import React, { ComponentProps } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const button = cva('button', {
  variants: {
    intent: {
      primary: ['bg-primary', 'text-white', 'border-primary'],
      secondary: ['bg-meta-3', 'text-white', 'border-meta-3'],
      muted: ['bg-black', 'text-white', 'border-black']
    },
    isRound: {
      true: ['rounded-full'],
      false: ['rounded-md']
    },
    size: {
      sm: ['text-sm', 'py-1', 'px-2'],
      md: ['text-base', 'py-2', 'px-6'],
      lg: ['text-base', 'py-4', 'px-10']
    },
    disabled: {
      false: null,
      true: ['opacity-50', 'cursor-not-allowed', ' !border-opacity-50']
    },
    outline: {
      false: null,
      true: ['bg-transparent', 'border', 'hover:border-opacity-90']
    },
    isFullWidth: {
      false: null,
      true: 'w-full'
    }
  },
  compoundVariants: [
    {
      intent: ['primary', 'secondary', 'muted'],
      disabled: false,
      class: ['hover:bg-opacity-90', 'hover:border-opacity-50']
    },
    {
      intent: ['primary'],
      outline: true,
      class: ['!text-primary']
    },
    {
      intent: ['muted'],
      outline: true,
      class: ['!text-black']
    },
    {
      intent: ['secondary'],
      outline: true,
      class: ['!text-secondary']
    }
  ],
  defaultVariants: {
    disabled: false,
    intent: 'primary',
    size: 'md',
    outline: false,
    isRound: false,
    isFullWidth: false
  }
});

interface ButtonProps
  extends Omit<ComponentProps<'button'>, 'disabled'>,
    VariantProps<typeof button> {
  label: string;
  isFullWidth?: boolean;
  htmlType?: 'button' | 'submit' | 'reset';
}

export const Button = ({
  label,
  htmlType = 'button',
  isFullWidth = false,
  outline = false,
  className,
  intent,
  size,
  disabled,
  children,
  isRound = false,
  ...props
}: ButtonProps) => {
  return (
    <button
      type={htmlType}
      disabled={disabled || undefined}
      className={`${button({ intent, size, disabled, className, isFullWidth, isRound, outline })} inline-flex items-center justify-center text-center font-medium`}
      {...props}
    >
      {children ? children : label}
    </button>
  );
};
