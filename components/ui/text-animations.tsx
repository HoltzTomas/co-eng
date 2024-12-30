'use client';
import { useEffect, useState } from "react";

const Typewriter = ({ text, delay = 35 }: {text: string, delay?: number}) => {
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
  
    useEffect(() => {
      let timeoutId: NodeJS.Timeout;
      const type = (index: number) => {
        if (index < text.length) {
          setDisplayedText(text.slice(0, index+1));
          setCurrentIndex(index);
          let newDelay = delay;
          if (text[index-1] != undefined && text[index - 1].match(/[,.!?]/)) {
            newDelay*=5;
          }
          timeoutId = setTimeout(() => {type(index+1)}, newDelay);
        }
      };
      type(currentIndex);
  
      return () => {
        clearTimeout(timeoutId);
      };
    }, [text, delay]);
  
    return <div>{displayedText}</div>;
};

export default Typewriter;