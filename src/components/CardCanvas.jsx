import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useDesigner, records } from '../context/DesignerContext';
import DesignerElement from './DesignerElement';
import styles from './CardCanvas.module.css';

const CardCanvas = () => {
    const { elements, zoom, selectedId, setSelectedId, updateElement, activeRecord } = useDesigner();

    const cardWidth = 500;
    const cardHeight = 315;

    // Dynamically map record data to text elements
    const recordAwareElements = useMemo(() => {
        return elements.map(el => {
            if (el.type === 'text' && el.id === '1') { // Assuming el.id '1' is the primary name
                return { ...el, content: records[activeRecord].name };
            }
            if (el.type === 'barcode' && el.id === '2') {
                return { ...el, content: records[activeRecord].id };
            }
            return el;
        });
    }, [elements, activeRecord]);

    return (
        <div className={styles.canvasContainer} style={{ transform: `scale(${zoom})` }}>
            <motion.div
                className={styles.card}
                style={{ width: cardWidth, height: cardHeight }}
                onClick={() => setSelectedId(null)}
            >
                <div className={styles.zebraOverlay} />
                <div className={styles.colorStripe} style={{ backgroundColor: records[activeRecord].color }} />

                {recordAwareElements.map(el => (
                    <DesignerElement
                        key={el.id}
                        el={el}
                        isSelected={selectedId === el.id}
                        onSelect={() => setSelectedId(el.id)}
                        onUpdate={updateElement}
                    />
                ))}
            </motion.div>
        </div>
    );
};

export default CardCanvas;
