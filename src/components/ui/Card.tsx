import { ReactNode } from 'react';
import { cn } from '../../utils/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className }: CardProps) {
  return (
    <div 
      className={cn(
        "bg-[var(--card)] border border-[var(--nav-border)] rounded-3xl p-6 shadow-xl backdrop-blur-sm",
        className
      )}
    >
      {children}
    </div>
  );
}