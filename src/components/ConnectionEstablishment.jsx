import React, { useState } from 'react'
import { motion } from 'framer-motion'
import './ConnectionEstablishment.css'

const ConnectionEstablishment = () => {
  const [stage, setStage] = useState(0)

  const stages = [
    { title: 'DTLS Handshake', desc: 'Peers authenticate and derive keys via DTLS.' },
    { title: 'SRTP Setup', desc: 'Keys from DTLS secure RTP/RTCP streams (SRTP).' },
    { title: 'ICE Finalize', desc: 'Selected candidate pair becomes the transport path.' },
    { title: 'Connected', desc: 'Transport is ready for media and data.' }
  ]

  const next = () => setStage(s => Math.min(s + 1, stages.length - 1))
  const prev = () => setStage(s => Math.max(s - 1, 0))
  const reset = () => setStage(0)

  return (
    <div className="conn-demo">
      <h2>Connection Establishment</h2>
      <p className="demo-description">From ICE checks to DTLS-SRTP secure transport.</p>

      <div className="demo-controls">
        <button onClick={prev} disabled={stage === 0}>Prev</button>
        <button onClick={next} disabled={stage >= stages.length - 1}>Next</button>
        <button onClick={reset}>Reset</button>
        <div className="step-indicator">Stage {stage + 1} of {stages.length}: {stages[stage].title}</div>
      </div>

      <div className="timeline">
        {stages.map((s, i) => (
          <div key={i} className={`node ${i <= stage ? 'active' : ''}`}>
            <div className="dot" />
            <div className="label">
              <strong>{s.title}</strong>
              <div className="desc">{s.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="handshake-area">
        <div className="peer">
          <div className="peer-icon">🖥️</div>
          <h3>Peer A</h3>
        </div>
        <div className="channel">
          {stage >= 0 && (
            <motion.div className="dtls" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>DTLS</motion.div>
          )}
          {stage >= 1 && (
            <motion.div className="srtp" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>SRTP</motion.div>
          )}
          {stage >= 2 && (
            <motion.div className="ice-final" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>ICE Path Selected</motion.div>
          )}
          {stage >= 3 && (
            <motion.div className="connected" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Connected</motion.div>
          )}
        </div>
        <div className="peer">
          <div className="peer-icon">📱</div>
          <h3>Peer B</h3>
        </div>
      </div>

      <div className="info-panel">
        <h3>📘 Key Concepts</h3>
        <ul>
          <li><strong>DTLS:</strong> Datagram TLS; provides key exchange and authentication</li>
          <li><strong>SRTP:</strong> Secure RTP using keys from DTLS handshake</li>
          <li><strong>RTCP:</strong> Control channel for stats and feedback</li>
          <li><strong>ICE Role:</strong> Chooses transport path on successful checks</li>
        </ul>
      </div>
    </div>
  )
}

export default ConnectionEstablishment
