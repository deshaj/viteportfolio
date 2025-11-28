import { Moon, Sun } from 'lucide-react';
import { useEffect, useState, useRef, useCallback } from 'react';
import { flushSync } from 'react-dom';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme === 'light' ? false : true;

    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }
  }, []);

  const toggleTheme = useCallback(async () => {
    const isAppearanceTransition =
      document.startViewTransition &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isAppearanceTransition || !buttonRef.current) {
      if (isDark) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        setIsDark(false);
      } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        setIsDark(true);
      }
      return;
    }

    const { top, left, width, height } = buttonRef.current.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const right = window.innerWidth - left;
    const bottom = window.innerHeight - top;
    const maxRadius = Math.hypot(
      Math.max(left, right),
      Math.max(top, bottom)
    );

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        if (isDark) {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('theme', 'light');
          setIsDark(false);
        } else {
          document.documentElement.classList.add('dark');
          localStorage.setItem('theme', 'dark');
          setIsDark(true);
        }
      });
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${maxRadius}px at ${x}px ${y}px)`,
      ];

      document.documentElement.animate(
        {
          clipPath: isDark ? [...clipPath].reverse() : clipPath,
        },
        {
          duration: 500,
          easing: 'ease-in-out',
          pseudoElement: isDark
            ? '::view-transition-old(root)'
            : '::view-transition-new(root)',
        }
      );
    });
  }, [isDark]);

  return (
    <button
      ref={buttonRef}
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-[var(--background)] transition-colors relative overflow-hidden group"
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5">
        <Sun 
            size={20} 
            className={`absolute inset-0 transform transition-all duration-500 rotate-0 scale-100 ${isDark ? 'rotate-90 scale-0 opacity-0' : ''}`} 
        />
        <Moon 
            size={20} 
            className={`absolute inset-0 transform transition-all duration-500 rotate-0 scale-100 ${!isDark ? '-rotate-90 scale-0 opacity-0' : ''}`} 
        />
      </div>
    </button>
  );
}