import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SignalingDemo from './components/SignalingDemo'
import ICEDemo from './components/ICEDemo'
import ConnectionEstablishment from './components/ConnectionEstablishment'
import MediaPipeline from './components/MediaPipeline'
// import P2PvsSFU from './components/P2PvsSFU'
import './App.css'

function App() {
  const [activeDemo, setActiveDemo] = useState('signaling')

  const demos = [
    { id: 'signaling', label: '1. Signaling', component: SignalingDemo },
    { id: 'ice', label: '2. ICE/STUN/TURN', component: ICEDemo },
    { id: 'connection', label: '3. Connection', component: ConnectionEstablishment },
    { id: 'media', label: '4. Media Pipeline', component: MediaPipeline },
    // { id: 'architecture', label: '5. P2P vs SFU', component: P2PvsSFU }
  ]

  const ActiveComponent = demos.find(d => d.id === activeDemo)?.component

  return (
    <div className="app">
      <header className="app-header">
        <h1>WebRTC Protocol Visualization</h1>
        <p>Interactive demonstration of real-time communication</p>
      </header>

      <nav className="demo-nav">
        {demos.map(demo => (
          <button
            key={demo.id}
            className={`nav-button ${activeDemo === demo.id ? 'active' : ''}`}
            onClick={() => setActiveDemo(demo.id)}
          >
            {demo.label}
          </button>
        ))}
      </nav>

      <main className="demo-container">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDemo}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="demo-content"
          >
            {ActiveComponent && <ActiveComponent />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}

export default App
