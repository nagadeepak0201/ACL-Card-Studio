import React from 'react';
import { useDesigner } from '../context/DesignerContext';
import styles from './MainLayout.module.css'; // Reusing or adding new styles
import { Type, Square, Circle, Barcode, Image as ImageIcon, Eye, EyeOff, Lock, Unlock, GripVertical } from 'lucide-react';
import { motion, Reorder } from 'framer-motion';

const LayersPanel = () => {
    const { elements, selectedId, setSelectedId, updateElement } = useDesigner();

    const getIcon = (type) => {
        switch (type) {
            case 'text': return <Type size={14} />;
            case 'rectangle': return <Square size={14} />;
            case 'circle': return <Circle size={14} />;
            case 'barcode': return <Barcode size={14} />;
            case 'image': return <ImageIcon size={14} />;
            default: return null;
        }
    };

    return (
        <div className={styles.layersList}>
            {elements.slice().reverse().map((el) => (
                <div
                    key={el.id}
                    className={`${styles.layerItem} ${selectedId === el.id ? styles.selectedLayer : ''}`}
                    onClick={() => setSelectedId(el.id)}
                >
                    <div className={styles.layerGrip}><GripVertical size={14} /></div>
                    <div className={styles.layerIcon}>{getIcon(el.type)}</div>
                    <div className={styles.layerName}>
                        {el.type.charAt(0).toUpperCase() + el.type.slice(1)} {el.dataField ? `(${el.dataField})` : ''}
                    </div>
                    <div className={styles.layerActions}>
                        <button
                            className={styles.layerActionBtn}
                            onClick={(e) => {
                                e.stopPropagation();
                                updateElement(el.id, { hidden: !el.hidden });
                            }}
                        >
                            {el.hidden ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LayersPanel;
