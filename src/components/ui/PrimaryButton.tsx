'use client'
import { cn } from '@/lib/utils'

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

export function PrimaryButton({ children, size = 'md', loading, className, disabled, ...props }: PrimaryButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-200',
        'bg-[#6C87FF] text-white hover:bg-[#5A75E8] active:scale-[0.97]',
        'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#6C87FF] disabled:active:scale-100',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6C87FF]',
        size === 'sm' && 'h-9 px-5 text-sm',
        size === 'md' && 'h-11 px-7 text-sm',
        size === 'lg' && 'h-13 px-9 text-base',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {children}
    </button>
  )
}

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
