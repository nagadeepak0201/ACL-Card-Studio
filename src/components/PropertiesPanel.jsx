import React from 'react';
import { useDesigner } from '../context/DesignerContext';
import styles from './PropertiesPanel.module.css';
import { Trash2, Move, Type, Maximize } from 'lucide-react';

const PropertiesPanel = () => {
    const { selectedId, elements, updateElement, deleteElement } = useDesigner();
    const selectedElement = elements.find(el => el.id === selectedId);

    if (!selectedElement) {
        return (
            <div className={styles.emptyState}>
                <div className={styles.infoIcon}>i</div>
                <p>Select an element to edit properties</p>
            </div>
        );
    }

    const handleChange = (field, value) => {
        updateElement(selectedId, { [field]: value });
    };

    return (
        <div className={styles.panel}>
            <div className={styles.section}>
                <h3><Move size={14} /> Position & Size</h3>
                <div className={styles.grid}>
                    <div className={styles.inputGroup}>
                        <label>X</label>
                        <input type="number" value={selectedElement.x} onChange={(e) => handleChange('x', parseInt(e.target.value))} />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Y</label>
                        <input type="number" value={selectedElement.y} onChange={(e) => handleChange('y', parseInt(e.target.value))} />
                    </div>
                    {selectedElement.type !== 'text' && (
                        <>
                            <div className={styles.inputGroup}>
                                <label>W</label>
                                <input type="number" value={selectedElement.width || 0} onChange={(e) => handleChange('width', parseInt(e.target.value))} />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>H</label>
                                <input type="number" value={selectedElement.height || 0} onChange={(e) => handleChange('height', parseInt(e.target.value))} />
                            </div>
                        </>
                    )}
                </div>
            </div>

            <div className={styles.divider} />

            {selectedElement.type === 'text' && (
                <div className={styles.section}>
                    <h3><Type size={14} /> Text Settings</h3>
                    <div className={styles.fullInput}>
                        <label>Content</label>
                        <textarea
                            value={selectedElement.content}
                            onChange={(e) => handleChange('content', e.target.value)}
                        />
                    </div>
                    <div className={styles.fullInput}>
                        <label>Font Family</label>
                        <select
                            className={styles.select}
                            value={selectedElement.fontFamily || 'sans-serif'}
                            onChange={(e) => handleChange('fontFamily', e.target.value)}
                        >
                            <option value="sans-serif">Sans Serif (Inter)</option>
                            <option value="serif">Serif (Times)</option>
                            <option value="monospace">Monospace (Courier)</option>
                            <option value="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif">Segoe UI</option>
                            <option value="'Georgia', serif">Georgia</option>
                        </select>
                    </div>
                    <div className={styles.fullInput}>
                        <label>Size</label>
                        <input type="number" value={selectedElement.fontSize} onChange={(e) => handleChange('fontSize', parseInt(e.target.value))} />
                    </div>
                    <div className={styles.checkboxRow}>
                        <div className={styles.checkboxGroup}>
                            <label>
                                <input type="checkbox" checked={selectedElement.bold} onChange={(e) => handleChange('bold', e.target.checked)} />
                                Bold
                            </label>
                        </div>
                        <div className={styles.checkboxGroup}>
                            <label>
                                <input type="checkbox" checked={selectedElement.italic} onChange={(e) => handleChange('italic', e.target.checked)} />
                                Italic
                            </label>
                        </div>
                    </div>
                </div>
            )}

            {selectedElement.type === 'barcode' && (
                <div className={styles.section}>
                    <h3><Maximize size={14} /> Barcode Settings</h3>
                    <div className={styles.fullInput}>
                        <label>Data</label>
                        <input value={selectedElement.content || '12345678'} onChange={(e) => handleChange('content', e.target.value)} />
                    </div>
                </div>
            )}

            <div className={styles.spacer} />

            <button className={styles.deleteBtn} onClick={() => deleteElement(selectedId)}>
                <Trash2 size={16} /> Delete Element
            </button>
        </div>
    );
};

export default PropertiesPanel;
