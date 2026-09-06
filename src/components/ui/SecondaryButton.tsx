'use client'
import { cn } from '@/lib/utils'

interface SecondaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
}

export function SecondaryButton({ children, size = 'md', className, ...props }: SecondaryButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-200',
        'border border-[#26282C] text-[#F4F4F3] hover:border-[#6C87FF] hover:text-[#6C87FF]',
        'active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6C87FF]',
        'disabled:opacity-40 disabled:cursor-not-allowed',
        size === 'sm' && 'h-9 px-5 text-sm',
        size === 'md' && 'h-11 px-7 text-sm',
        size === 'lg' && 'h-13 px-9 text-base',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
