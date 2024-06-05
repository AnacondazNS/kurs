import { useEffect, useRef } from "react";

export const ObserverComponent = ({ onVisible }) => {
    const targetRef = useRef(null);
  
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            onVisible?.();
          }
        },
        { threshold: 0.5 } // Обратите внимание, что это пороговое значение можно настроить
      );
  
      if (targetRef.current) {
        observer.observe(targetRef.current);
      }
  
      return () => {
        if (targetRef.current) {
          observer.unobserve(targetRef.current);
        }
      };
    }, [onVisible]);
  
    return <div className="obser" ref={targetRef} />;
  };