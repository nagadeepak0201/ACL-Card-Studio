import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './CardCanvas.module.css';

const DesignerElement = ({ el, isSelected, onSelect, onUpdate }) => {
    const [pos, setPos] = useState({ x: el.x, y: el.y });
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        setPos({ x: el.x, y: el.y });
    }, [el.x, el.y]);

    const handleMouseDown = (e) => {
        e.stopPropagation();

        if (!isSelected) {
            onSelect();
        }

        setIsDragging(true);
        const startX = e.clientX - pos.x;
        const startY = e.clientY - pos.y;

        const handleMouseMove = (me) => {
            const newX = me.clientX - startX;
            const newY = me.clientY - startY;
            setPos({ x: newX, y: newY });
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            onUpdate(el.id, { x: pos.x, y: pos.y });
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    };

    const handleClick = (e) => {
        e.stopPropagation();
        onSelect();
    };

    return (
        <motion.div
            className={`${styles.element} ${isSelected ? styles.selected : ''}`}
            style={{ left: pos.x, top: pos.y, zIndex: isSelected ? 10 : 1 }}
            onMouseDown={handleMouseDown}
            onClick={handleClick}
        >
            {el.type === 'text' && (
                <span style={{
                    fontSize: el.fontSize,
                    fontWeight: el.bold ? 'bold' : 'normal',
                    fontStyle: el.italic ? 'italic' : 'normal',
                    fontFamily: el.fontFamily || "'Segoe UI', Roboto, sans-serif",
                    color: '#1a1a1a',
                }}>
                    {el.content}
                </span>
            )}
            {el.type === 'barcode' && (
                <div className={styles.barcodePlaceholder} style={{ width: el.width || 150, height: el.height || 50 }}>
                    <div className={styles.barcodeLines} />
                    <span className={styles.barcodeLabel}>{el.content || '123456'}</span>
                </div>
            )}
            {el.type === 'image' && (
                <div className={styles.imagePlaceholder} style={{ width: el.width || 120, height: el.height || 140 }}>
                    <div className={styles.imageInner}>
                        <div className={styles.userAvatar} />
                    </div>
                </div>
            )}

            {isSelected && (
                <>
                    <div className={`${styles.handle} ${styles.tl}`} />
                    <div className={`${styles.handle} ${styles.tr}`} />
                    <div className={`${styles.handle} ${styles.bl}`} />
                    <div className={`${styles.handle} ${styles.br}`} />
                </>
            )}
        </motion.div>
    );
};

export default DesignerElement;
