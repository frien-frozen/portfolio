'use client';

import { useEffect, useState, useRef } from 'react';

interface TextScrambleProps {
    text: string;
    className?: string;
}

const chars = '!<>-_\\/[]{}—=+*^?#________';

export default function TextScramble({ text, className }: TextScrambleProps) {
    const [displayText, setDisplayText] = useState(text);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        let iteration = 0;

        if (intervalRef.current) clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            setDisplayText(() =>
                text
                    .split('')
                    .map((letter, index) => {
                        if (index < iteration) {
                            return text[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join('')
            );

            if (iteration >= text.length) {
                if (intervalRef.current) clearInterval(intervalRef.current);
            }

            iteration += 1 / 3;
        }, 30);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [text]);

    return (
        <span
            className={className}
            style={{ cursor: 'default', display: 'inline-block' }}
        >
            {displayText}
        </span>
    );
}
