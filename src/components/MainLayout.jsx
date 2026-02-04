import React from 'react';
import { motion } from 'framer-motion';
import {
    Square, Type, Image as ImageIcon, Barcode, MousePointer2,
    Layers, Database, Sliders, ChevronDown, Save, Printer,
    Search, User, PlusCircle, Undo2, Redo2, Circle
} from 'lucide-react';
import { useDesigner } from '../context/DesignerContext';
import PropertiesPanel from './PropertiesPanel';
import LayersPanel from './LayersPanel';
import styles from './MainLayout.module.css';

const MainLayout = ({ children }) => {
    const {
        addElement, zoom, setZoom, activeRecord, setActiveRecord,
        records, saveDesign, printDesign, undo, redo, canUndo, canRedo
    } = useDesigner();

    // Removed local records definition as per instruction

    return (
        <div className={styles.container}>
            {/* Header */}
            <header className={styles.header}>
                <div className={styles.logo}>
                    <motion.div
                        initial={{ rotate: -10 }}
                        animate={{ rotate: 0 }}
                        className={styles.logoMark}
                    >
                        ACL
                    </motion.div>
                    <span className={styles.logoText}>Card Studio <span className={styles.version}>PRO v1.0</span></span>
                </div>
                <nav className={styles.nav}>
                    <button>File</button>
                    <button>Design</button>
                    <button>Database</button>
                    <button>Options</button>
                    <button>Help</button>
                </nav>
                <div className={styles.userProfile}>
                    <button className={styles.iconBtn}><Search size={18} /></button>
                    <button className={styles.iconBtn}><User size={18} /></button>
                </div>
            </header>

            {/* Toolbar */}
            <div className={styles.toolbar}>
                <div className={styles.toolGroup}>
                    <button className={styles.toolBtn} title="Save" onClick={saveDesign}><Save size={18} /></button>
                    <button className={styles.toolBtn} title="Print" onClick={printDesign}><Printer size={18} /></button>
                </div>
                <div className={styles.divider} />
                <div className={styles.toolGroup}>
                    <button className={styles.toolBtn} title="Undo" onClick={undo} disabled={!canUndo}><Undo2 size={18} /></button>
                    <button className={styles.toolBtn} title="Redo" onClick={redo} disabled={!canRedo}><Redo2 size={18} /></button>
                </div>
                <div className={styles.divider} />
                <div className={styles.spacer} />
                <div className={styles.zoomControls}>
                    <button onClick={() => setZoom(z => Math.max(0.2, z - 0.1))}>-</button>
                    <span>{(zoom * 100).toFixed(0)}%</span>
                    <button onClick={() => setZoom(z => Math.min(4, z + 0.1))}>+</button>
                </div>
            </div>

            <div className={styles.mainContent}>
                {/* Left Tools */}
                <aside className={styles.sidebar}>
                    <button className={styles.sidebarBtn} active="true" title="Select"><MousePointer2 size={20} /></button>
                    <button className={styles.sidebarBtn} title="Rectangle" onClick={() => addElement('rectangle')}><Square size={20} /></button>
                    <button className={styles.sidebarBtn} title="Circle" onClick={() => addElement('circle')}><Circle size={20} /></button>
                    <button className={styles.sidebarBtn} title="Text" onClick={() => addElement('text')}><Type size={20} /></button>
                    <button className={styles.sidebarBtn} title="Barcode" onClick={() => addElement('barcode')}><Barcode size={20} /></button>
                    <button className={styles.sidebarBtn} title="Image" onClick={() => addElement('image')}><ImageIcon size={20} /></button>
                    <div className={styles.spacer} />
                    <button className={styles.sidebarBtn} title="Layers"><Layers size={20} /></button>
                </aside>

                {/* Workspace */}
                <main className={styles.workspace}>
                    <div className={styles.workspaceInner}>
                        {children}
                    </div>
                </main>

                {/* Right Panel */}
                <aside className={styles.properties}>
                    <div className={styles.panelHeader}>
                        <Layers size={16} color="var(--accent-primary)" />
                        <span>Layers</span>
                    </div>
                    <div style={{ maxHeight: '30%', overflowY: 'auto', borderBottom: '1px solid var(--border-color)' }}>
                        <LayersPanel />
                    </div>

                    <div className={styles.panelHeader}>
                        <Sliders size={16} color="var(--accent-primary)" />
                        <span>Properties</span>
                    </div>
                    <div style={{ flex: 1, overflowY: 'auto' }}>
                        <PropertiesPanel />
                    </div>
                </aside>
            </div>

            {/* Footer / Database Strip */}
            <footer className={styles.footer}>
                <div className={styles.databaseBar}>
                    <Database size={16} color="var(--accent-secondary)" />
                    <span>Card Designs</span>
                    <PlusCircle size={16} className={styles.plusIcon} />
                    <button className={styles.toggleBtn}><ChevronDown size={14} /></button>
                </div>
                <div className={styles.recordStrip}>
                    {records.map((rec, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -5 }}
                            className={`${styles.recordThumb} ${activeRecord === i ? styles.activeRecord : ''}`}
                            onClick={() => setActiveRecord(i)}
                        >
                            <div className={styles.thumbCard} style={{
                                borderBottom: `4px solid ${rec.color}`,
                                background: `linear-gradient(135deg, #fff 0%, #f0f0f0 100%)`
                            }}>
                                <div className={styles.thumbStripe} style={{ backgroundColor: rec.color }} />
                            </div>
                            <span>{rec.name}</span>
                        </motion.div>
                    ))}
                </div>
            </footer>
        </div>
    );
};

export default MainLayout;
