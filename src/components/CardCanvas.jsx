import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useDesigner, records } from '../context/DesignerContext';
import DesignerElement from './DesignerElement';
import styles from './CardCanvas.module.css';

const CardCanvas = () => {
    const { elements, zoom, selectedId, setSelectedId, updateElement, activeRecord } = useDesigner();

    const cardWidth = 500;
    const cardHeight = 315;

    const currentRecord = records[activeRecord];
    const isTemplate = !!currentRecord?.template;

    // Dynamically map record data to elements with dataFields
    const recordAwareElements = useMemo(() => {
        return elements.map(el => {
            if (el.dataField && currentRecord) {
                const recordValue = currentRecord[el.dataField];
                if (recordValue !== undefined) {
                    return { ...el, content: recordValue };
                }
            }
            return el;
        });
    }, [elements, currentRecord]);

    return (
        <div className={styles.canvasContainer} style={{ transform: `scale(${zoom})` }}>
            <motion.div
                className={styles.card}
                style={{ width: cardWidth, height: cardHeight }}
                onClick={() => setSelectedId(null)}
            >
                {!isTemplate && <div className={styles.zebraOverlay} />}
                {!isTemplate && <div className={styles.colorStripe} style={{ backgroundColor: currentRecord?.color }} />}

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
