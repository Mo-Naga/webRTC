import React, { useState } from 'react'
import { motion } from 'framer-motion'
import './P2PvsSFU.css'

const P2PvsSFU = () => {
  const [participants, setParticipants] = useState(2)

  const add = () => setParticipants(p => Math.min(p + 1, 8))
  const remove = () => setParticipants(p => Math.max(p - 1, 2))

  const peers = Array.from({ length: participants }, (_, i) => `Peer ${i + 1}`)

  return (
    <div className="arch-demo">
      <h2>P2P vs SFU Architecture</h2>
      <p className="demo-description">Understand bandwidth scaling and topology differences for multi-party calls.</p>

      <div className="demo-controls">
        <button onClick={add}>Add Participant</button>
        <button onClick={remove} disabled={participants <= 2}>Remove Participant</button>
        <div className="step-indicator">Participants: {participants}</div>
      </div>

      <div className="topologies">
        <div className="topology">
          <h3>Mesh P2P</h3>
          <p>Each peer sends streams to all others (N-1 uploads).</p>
          <div className="mesh">
            {peers.map((p, i) => (
              <div key={i} className="peer">
                <div className="icon">🟦</div>
                <div className="label">{p}</div>
              </div>
            ))}
            {peers.map((_, i) => peers.map((__, j) => (
              i !== j ? <motion.div key={`${i}-${j}`} className="link" initial={{ opacity: 0 }} animate={{ opacity: 1 }} /> : null
            )))}
          </div>
          <div className="math">Uploads per peer: {participants - 1} | Total links: {participants * (participants - 1)}</div>
        </div>
        <div className="topology">
          <h3>SFU</h3>
          <p>Peers send a single upstream to SFU; SFU forwards selective streams.</p>
          <div className="sfu">
            <div className="sfu-node">SFU</div>
            {peers.map((p, i) => (
              <div key={i} className="peer">
                <div className="icon">🟩</div>
                <div className="label">{p}</div>
              </div>
            ))}
            {peers.map((_, i) => (
              <motion.div key={`up-${i}`} className="uplink" initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
            ))}
            {peers.map((_, i) => (
              <motion.div key={`down-${i}`} className="downlink" initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
            ))}
          </div>
          <div className="math">Uploads per peer: 1 | Total uplinks: {participants} | Total downlinks: {participants}</div>
        </div>
      </div>

      <div className="info-panel">
        <h3>📘 Key Concepts</h3>
        <ul>
          <li><strong>Mesh:</strong> Simple, no server mixing, but scales poorly</li>
          <li><strong>SFU:</strong> Selective forwarding, lower upstream per peer, better scalability</li>
          <li><strong>MCU vs SFU:</strong> MCU mixes streams server-side; SFU forwards</li>
          <li><strong>Trade-offs:</strong> Bandwidth, latency, server cost, features</li>
        </ul>
      </div>
    </div>
  )
}

export default P2PvsSFU
