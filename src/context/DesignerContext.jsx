import React, { createContext, useContext, useState } from 'react';

const DesignerContext = createContext();

export const records = [
  { id: 'REC-101', name: 'John Cena', color: '#10b981' },
  { id: 'REC-102', name: 'Susan Long', color: '#64748b' },
  { id: 'REC-103', name: 'Timothy Jones', color: '#fbbf24' },
  { id: 'REC-104', name: 'Joana Myers', color: '#ec4899' },
  { id: 'REC-105', name: 'Marie Henderson', color: '#ef4444' },
  { id: 'REC-106', name: 'Arthur Morgan', color: '#3b82f6' },
  { id: 'REC-107', name: 'Lia Volkov', color: '#8b5cf6' },
  { id: 'REC-108', name: 'Marcus Fenix', color: '#1e293b' }
];

export const DesignerProvider = ({ children }) => {
  const [elements, setElements] = useState([
    { id: '1', type: 'text', content: 'John Cena', x: 100, y: 100, fontSize: 32, bold: true, italic: false, fontFamily: 'serif' },
    { id: '2', type: 'barcode', x: 100, y: 200, width: 220, height: 60 },
  ]);
  const [selectedId, setSelectedId] = useState(null);
  const [activeRecord, setActiveRecord] = useState(0);
  const [zoom, setZoom] = useState(1.4);

  const updateElement = (id, updates) => {
    setElements(prev => prev.map(el => el.id === id ? { ...el, ...updates } : el));
  };

  const deleteElement = (id) => {
    setElements(prev => prev.filter(el => el.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  const addElement = (type) => {
    const newEl = {
      id: Date.now().toString(),
      type,
      x: 50,
      y: 50,
      content: type === 'text' ? 'New Text' : '',
      ...(type === 'text' ? { fontSize: 16, bold: false, italic: false, fontFamily: 'sans-serif' } : { width: 100, height: 50 })
    };
    setElements([...elements, newEl]);
    setSelectedId(newEl.id);
  };

  const saveDesign = () => {
    const designData = {
      elements,
      activeRecord: records[activeRecord],
      timestamp: new Date().toISOString()
    };
    console.log('Saving Design:', designData);
    alert('Design saved to console! (Ready for database integration)');
  };

  const printDesign = () => {
    window.print();
  };

  return (
    <DesignerContext.Provider value={{
      elements,
      selectedId,
      setSelectedId,
      updateElement,
      deleteElement,
      addElement,
      activeRecord,
      setActiveRecord,
      records,
      zoom,
      setZoom,
      saveDesign,
      printDesign
    }}>
      {children}
    </DesignerContext.Provider>
  );
};

export const useDesigner = () => useContext(DesignerContext);
