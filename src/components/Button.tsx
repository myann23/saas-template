import { ButtonHTMLAttributes, forwardRef } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, children, disabled, ...props }, ref) => {
    const baseStyles = {
      borderRadius: '6px',
      fontWeight: 500,
      cursor: disabled || loading ? 'not-allowed' : 'pointer',
      opacity: disabled || loading ? 0.6 : 1,
      border: 'none',
      transition: 'all 0.2s',
    };

    const variantStyles = {
      primary: { backgroundColor: '#0070f3', color: 'white' },
      secondary: { backgroundColor: '#eaeaea', color: '#333' },
      danger: { backgroundColor: '#e00', color: 'white' },
    };

    const sizeStyles = {
      sm: { padding: '6px 12px', fontSize: '14px' },
      md: { padding: '10px 20px', fontSize: '16px' },
      lg: { padding: '14px 28px', fontSize: '18px' },
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        style={{ ...baseStyles, ...variantStyles[variant], ...sizeStyles[size] }}
        {...props}
      >
        {loading ? 'Loading...' : children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
