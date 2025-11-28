import React, { useState, useRef, useLayoutEffect, useEffect, cloneElement } from 'react';
import { cn } from '../../utils/utils';

export type NavItem = {
  id: string | number;
  icon: React.ReactElement;
  label?: string;
  href?: string;
  onClick?: () => void;
};

export type LimelightNavProps = {
  items: NavItem[];
  activeIndex?: number;
  onTabChange?: (index: number) => void;
  className?: string;
  limelightClassName?: string;
  iconContainerClassName?: string;
  iconClassName?: string;
};

export const LimelightNav = ({
  items,
  activeIndex: propActiveIndex = 0,
  onTabChange,
  className,
  limelightClassName,
  iconContainerClassName,
  iconClassName,
}: LimelightNavProps) => {
  const [activeIndex, setActiveIndex] = useState(propActiveIndex);
  const [isReady, setIsReady] = useState(false);
  const navItemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const limelightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setActiveIndex(propActiveIndex);
  }, [propActiveIndex]);

  useLayoutEffect(() => {
    if (items.length === 0) return;
    const limelight = limelightRef.current;
    const activeItem = navItemRefs.current[activeIndex];
    
    if (limelight && activeItem) {
      const newLeft = activeItem.offsetLeft + activeItem.offsetWidth / 2 - limelight.offsetWidth / 2;
      limelight.style.left = `${newLeft}px`;
      if (!isReady) {
        setTimeout(() => setIsReady(true), 50);
      }
    }
  }, [activeIndex, isReady, items]);

  const handleItemClick = (index: number, itemOnClick?: () => void) => {
    setActiveIndex(index);
    onTabChange?.(index);
    itemOnClick?.();
  };

  if (items.length === 0) return null;

  return (
    <nav className={cn('adaptive-nav relative inline-flex items-center h-16 rounded-2xl border px-2', className)}>
      {items.map(({ id, icon, label, href, onClick }, index) => (
          <a
            key={id}
            href={href || '#'}
            ref={el => { navItemRefs.current[index] = el; }}
            className={cn('relative z-20 flex h-full cursor-pointer items-center justify-center px-6 py-2', iconContainerClassName)}
            onClick={(e) => {
                e.preventDefault();
                handleItemClick(index, onClick);
            }}
            aria-label={label || `Navigation item ${index + 1}`}
            role="link"
          >
            {cloneElement(icon as React.ReactElement<any>, {
              className: cn(
                'w-6 h-6 transition-all duration-300 ease-in-out',
                activeIndex === index ? 'opacity-100 text-[var(--nav-highlight)] scale-110' : 'opacity-50 hover:opacity-80',
                (icon.props as any)?.className || '',
                iconClassName || ''
              ),
            })}
          </a>
      ))}
      
      <div 
        ref={limelightRef}
        className={cn(
          'absolute top-0 z-10 w-12 h-[4px] rounded-b-full bg-[var(--nav-highlight)] shadow-[0_15px_20px_var(--nav-highlight)]',
          isReady ? 'transition-[left] duration-500 cubic-bezier(0.34, 1.56, 0.64, 1)' : '',
          limelightClassName
        )}
        style={{ left: '-999px' }}
      >
        <div className="absolute left-[-50%] top-[4px] w-[200%] h-12 [clip-path:polygon(20%_0%,80%_0%,100%_100%,0%_100%)] bg-gradient-to-b from-[var(--nav-highlight)]/30 to-transparent pointer-events-none" />
      </div>
    </nav>
  );
};