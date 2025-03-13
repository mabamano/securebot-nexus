
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface TypingEffectProps {
  text: string;
  typingSpeed?: number;
  className?: string;
  onComplete?: () => void;
}

const TypingEffect = ({
  text,
  typingSpeed = 50,
  className,
  onComplete
}: TypingEffectProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, typingSpeed);
      
      return () => clearTimeout(timeout);
    } else if (!isComplete) {
      setIsComplete(true);
      onComplete?.();
    }
  }, [currentIndex, text, typingSpeed, isComplete, onComplete]);

  return (
    <span className={cn('inline-block', className)}>
      {displayedText}
      {!isComplete && (
        <span className="inline-block w-[2px] h-4 bg-current animate-blink ml-0.5" />
      )}
    </span>
  );
};

export default TypingEffect;
