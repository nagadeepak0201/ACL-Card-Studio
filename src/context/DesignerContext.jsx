import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const DesignerContext = createContext();

export const records = [
  {
    id: 'VIS-202',
    name: 'James Wilson',
    title: 'Guest @ ACL Studio',
    footer: 'VALID TODAY ONLY',
    header: 'VISITOR PASS',
    color: '#10b981',
    template: 'visitor_pass'
  },
  {
    id: 'EXEC-001',
    name: 'Alexandra',
    title: 'Chief Executive Officer',
    org: 'ACL Global Holdings',
    footer: 'EXECUTIVE ACCESS',
    color: '#1e293b',
    template: 'executive_access'
  },
  {
    id: 'EVNT-99',
    name: 'Sarah Chen',
    title: 'Full Stack Speaker',
    header: 'PULSE TECH 2026',
    color: '#8b5cf6',
    template: 'pulse_tech'
  },
  { id: 'REC-101', name: 'John Cena', color: '#10b981' },
  { id: 'REC-102', name: 'Susan Long', color: '#64748b' },
  { id: 'REC-105', name: 'Marie Henderson', color: '#ef4444' }
];

const templates = {
  visitor_pass: [
    { id: 'bg-header', type: 'rectangle', x: 0, y: 0, width: 500, height: 75, color: '#10b981' },
    { id: 'h1', type: 'text', content: 'VISITOR PASS', x: 20, y: 22, fontSize: 24, bold: true, color: '#fff' },
    { id: 'img', type: 'image', x: 30, y: 100, width: 140, height: 160 },
    { id: 'name', type: 'text', dataField: 'name', x: 195, y: 110, fontSize: 36, bold: true, color: '#064e3b' },
    { id: 'title', type: 'text', dataField: 'title', x: 195, y: 155, fontSize: 18, color: '#059669' },
    { id: 'barcode', type: 'barcode', dataField: 'id', x: 195, y: 200, width: 220, height: 60 },
    { id: 'footer', type: 'text', dataField: 'footer', x: 20, y: 275, fontSize: 14, bold: true, color: '#10b981' }
  ],
  pulse_tech: [
    { id: 'bg', type: 'rectangle', x: 0, y: 0, width: 500, height: 315, color: '#111827' },
    { id: 'stripe', type: 'rectangle', x: 0, y: 285, width: 500, height: 30, color: '#8b5cf6' },
    { id: 'h1', type: 'text', dataField: 'header', x: 300, y: 30, fontSize: 14, bold: true, color: '#8b5cf6' },
    { id: 'img', type: 'image', x: 30, y: 30, width: 150, height: 170 },
    { id: 'name', type: 'text', dataField: 'name', x: 30, y: 205, fontSize: 44, bold: true, color: '#fff' },
    { id: 'title', type: 'text', dataField: 'title', x: 30, y: 255, fontSize: 18, color: '#a78bfa' },
    { id: 'barcode', type: 'barcode', dataField: 'id', x: 330, y: 220, width: 160, height: 50 }
  ],
  executive_access: [
    { id: 'top-stripe', type: 'rectangle', x: 10, y: 0, width: 480, height: 8, color: '#0f172a' },
    { id: 'img', type: 'image', x: 40, y: 40, width: 140, height: 160 },
    { id: 'name', type: 'text', dataField: 'name', x: 210, y: 70, fontSize: 34, bold: true, color: '#0f172a' },
    { id: 'org', type: 'text', dataField: 'org', x: 210, y: 160, fontSize: 16, bold: true, color: '#0f172a' },
    { id: 'barcode', type: 'barcode', dataField: 'id', x: 210, y: 220, width: 220, height: 60 },
    { id: 'footer', type: 'text', dataField: 'footer', x: 25, y: 280, fontSize: 12, bold: true, color: '#0f172a' }
  ]
};

const defaultElements = [
  { id: '1', type: 'text', content: 'Name', x: 100, y: 100, fontSize: 32, bold: true, italic: false, fontFamily: 'serif', dataField: 'name', color: '#1a1a1a' },
  { id: '2', type: 'barcode', x: 100, y: 200, width: 220, height: 60, dataField: 'id' },
];

export const DesignerProvider = ({ children }) => {
  const [elements, setElements] = useState(defaultElements);
  const [selectedId, setSelectedId] = useState(null);
  const [activeRecord, setActiveRecord] = useState(0);
  const [zoom, setZoom] = useState(1.4);
  const [history, setHistory] = useState([elements]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Apply template when active record changes
  useEffect(() => {
    const record = records[activeRecord];
    if (record && record.template && templates[record.template]) {
      setElements(templates[record.template]);
    } else {
      setElements(defaultElements);
    }
  }, [activeRecord]);

  const saveToHistory = useCallback((newElements) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newElements);
    if (newHistory.length > 50) newHistory.shift();
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);

  const updateElement = (id, updates, skipHistory = false) => {
    setElements(prev => {
      const next = prev.map(el => el.id === id ? { ...el, ...updates } : el);
      if (!skipHistory) {
        saveToHistory(next);
      }
      return next;
    });
  };

  const deleteElement = (id) => {
    const next = elements.filter(el => el.id !== id);
    setElements(next);
    saveToHistory(next);
    if (selectedId === id) setSelectedId(null);
  };

  const addElement = (type) => {
    const newEl = {
      id: Date.now().toString(),
      type,
      x: 50,
      y: 50,
      content: type === 'text' ? 'New Text' : '',
      color: '#1a1a1a',
      ...(type === 'text' ? { fontSize: 16, bold: false, italic: false, fontFamily: 'sans-serif' } : { width: 100, height: 50 })
    };
    const next = [...elements, newEl];
    setElements(next);
    saveToHistory(next);
    setSelectedId(newEl.id);
  };

  const undo = () => {
    if (historyIndex > 0) {
      const prevIndex = historyIndex - 1;
      setHistoryIndex(prevIndex);
      setElements(history[prevIndex]);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const nextIndex = historyIndex + 1;
      setHistoryIndex(nextIndex);
      setElements(history[nextIndex]);
    }
  };

  const saveDesign = () => {
    const designData = {
      elements,
      activeRecord: records[activeRecord],
      timestamp: new Date().toISOString()
    };
    console.log('Saving Design:', designData);
    alert('Design saved to console!');
  };

  const printDesign = () => {
    //window.print();
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
      printDesign,
      undo,
      redo,
      canUndo: historyIndex > 0,
      canRedo: historyIndex < history.length - 1
    }}>
      {children}
    </DesignerContext.Provider>
  );
};

export const useDesigner = () => useContext(DesignerContext);

