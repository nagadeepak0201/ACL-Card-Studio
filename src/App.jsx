import React from 'react'
import { DesignerProvider } from './context/DesignerContext'
import MainLayout from './components/MainLayout'
import CardCanvas from './components/CardCanvas'
import './index.css'

function App() {
  return (
    <DesignerProvider>
      <MainLayout>
        <CardCanvas />
      </MainLayout>
    </DesignerProvider>
  )
}

export default App
