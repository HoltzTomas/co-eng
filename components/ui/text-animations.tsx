'use client';
import { useEffect, useState } from "react";
import Markdown from 'react-markdown';
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";


const Typewriter = ({ text, delay = 20 }: { text: string, delay?: number }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const type = (index: number) => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        setCurrentIndex(index);
        let newDelay = delay;
        if (text[index - 1] != undefined && text[index - 1].match(/[,.!?]/)) {
          newDelay *= 5;
        }
        timeoutId = setTimeout(() => { type(index + 1) }, newDelay);
      }
    };
    type(currentIndex);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [text, delay, currentIndex]);

  return (<div>
    <Markdown
    remarkPlugins={[remarkGfm]} // Soporte para GFM (listas de tareas, tablas, etc.)
    rehypePlugins={[rehypeRaw]} >
      {displayedText}
    </Markdown>
  </div>);
};

export default Typewriter;