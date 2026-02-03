import { useState, useCallback, useRef } from 'react';

export const useDraggable = (initialX, initialY, onDragEnd) => {
    const [position, setPosition] = useState({ x: initialX, y: initialY });
    const isDragging = useRef(false);
    const offset = useRef({ x: 0, y: 0 });

    const onMouseDown = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        isDragging.current = true;
        offset.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        };

        const onMouseMove = (moveEvent) => {
            if (!isDragging.current) return;
            const newX = moveEvent.clientX - offset.current.x;
            const newY = moveEvent.clientY - offset.current.y;
            setPosition({ x: newX, y: newY });
        };

        const onMouseUp = () => {
            isDragging.current = false;
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
            if (onDragEnd) onDragEnd(position.x, position.y);
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
    }, [position, onDragEnd]);

    return { position, onMouseDown };
};
