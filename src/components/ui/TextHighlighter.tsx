import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import { annotate } from "rough-notation";
import { RoughAnnotation } from "rough-notation/lib/model";

type AnnotationAction =
  | "highlight"
  | "underline"
  | "box"
  | "circle"
  | "strike-through"
  | "crossed-off"
  | "bracket";

interface HighlighterProps {
  children: React.ReactNode;
  action?: AnnotationAction;
  color?: string;
  strokeWidth?: number;
  animationDuration?: number;
  iterations?: number;
  padding?: number;
  multiline?: boolean;
  isView?: boolean;
  className?: string;
}

export function Highlighter({
  children,
  action = "highlight",
  color = "var(--nav-highlight)", 
  strokeWidth = 2,
  animationDuration = 800,
  iterations = 2,
  padding = 5,
  multiline = true,
  isView = false,
  className,
}: HighlighterProps) {
  const elementRef = useRef<HTMLSpanElement>(null);
  const annotationRef = useRef<RoughAnnotation | null>(null);
  const isInView = useInView(elementRef, {
    once: false,
    margin: "-10%",
  });
  const shouldShow = !isView || isInView; 

  useEffect(() => {
    if (!shouldShow) return;

    const element = elementRef.current;
    if (!element) return;

    const annotationConfig = {
      type: action,
      color,
      strokeWidth,
      animationDuration,
      iterations,
      padding,
      multiline,
    };

    const annotation = annotate(element, annotationConfig);
    annotationRef.current = annotation;
    annotationRef.current.show();

    return () => {
      if (annotationRef.current) {
        annotationRef.current.remove();
      }
    };
  }, [shouldShow, action, color, strokeWidth, padding, multiline]);

  return (
    <span ref={elementRef} className={`relative inline-block ${className}`}>
      {children}
    </span>
  );
}