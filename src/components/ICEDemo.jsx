import React, { useState } from 'react'
import { motion } from 'framer-motion'
// import { ArrowRight } from 'lucide-react'
import './ICEDemo.css'

const ICEDemo = () => {
  const [phase, setPhase] = useState(0)

  const phases = [
    { title: 'Gather Candidates', desc: 'Each peer gathers host, reflexive (STUN), and relay (TURN) candidates.' },
    { title: 'STUN Requests', desc: 'Peers contact STUN to discover server-reflexive addresses (public mapped IP:port).' },
    { title: 'TURN Allocation', desc: 'If direct paths fail or are blocked, peers allocate relays on TURN.' },
    { title: 'Connectivity Checks', desc: 'Peers run ICE checks (STUN binding) between candidate pairs to find a working path.' },
    { title: 'Nomination', desc: 'The best working candidate pair is nominated for media/data transport.' }
  ]

  const next = () => setPhase(p => Math.min(p + 1, phases.length - 1))
  const prev = () => setPhase(p => Math.max(p - 1, 0))
  const reset = () => setPhase(0)

  return (
    <div className="ice-demo">
      <h2>ICE Framework: STUN and TURN</h2>
      <p className="demo-description">Interactive view of candidate gathering, connectivity checks, and nomination.</p>

      <div className="demo-controls">
        <button onClick={prev} disabled={phase === 0}>Prev Phase</button>
        <button onClick={next} disabled={phase >= phases.length - 1}>Next Phase</button>
        <button onClick={reset}>Reset</button>
        <div className="step-indicator">Phase {phase + 1} of {phases.length}: {phases[phase].title}</div>
      </div>

      <div className="network-area">
        <div className="peer host">
          <div className="peer-icon">🖥️</div>
          <h3>Peer A</h3>
          <ul className="candidate-list">
            <li className={phase >= 0 ? 'on' : ''}>Host: 10.0.0.12:54321</li>
            <li className={phase >= 1 ? 'on' : ''}>Reflexive (STUN): {phase >= 1 ? '203.0.113.5:60012' : 'Unknown'}</li>
            <li className={phase >= 2 ? 'on' : ''}>Relay (TURN): turn.example.com:45000</li>
          </ul>
        </div>

        <div className="infra">
          <div className="stun">
            <div className="icon">❄️</div>
            <h4>STUN Server</h4>
            {phase >= 1 && (
              <motion.div className="badge" initial={{ scale: 0 }} animate={{ scale: 1 }}>Binding Requests</motion.div>
            )}
          </div>
          <div className="turn">
            <div className="icon">🔁</div>
            <h4>TURN Server</h4>
            {phase >= 2 && (
              <motion.div className="badge turn" initial={{ scale: 0 }} animate={{ scale: 1 }}>Relay Allocation</motion.div>
            )}
          </div>
        </div>

        <div className="peer host">
          <div className="peer-icon">📱</div>
          <h3>Peer B</h3>
          <ul className="candidate-list">
            <li className={phase >= 0 ? 'on' : ''}>Host: 192.168.1.8:51234</li>
            <li className={phase >= 1 ? 'on' : ''}>Reflexive (STUN): {phase >= 1 ? '198.51.100.23:52011' : 'Unknown'}</li>
            <li className={phase >= 2 ? 'on' : ''}>Relay (TURN): turn.example.com:46000</li>
          </ul>
        </div>

        {/* STUN Request/Response Arrows for Peer A
        {phase >= 1 && phase < 2 && (
          <>
            <motion.div
              className="arrow stun-request-a"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.6 }}
            >
              <ArrowRight size={28} />
            </motion.div>
            <motion.div
              className="arrow stun-response-a"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <ArrowRight size={28} />
            </motion.div>
          </>
        )} */}
      </div>

      {phase >= 3 && (
        <div className="checks">
          <h3>Connectivity Checks</h3>
          <div className="pairs">
            <div className={`pair ${phase >= 4 ? 'nominated' : ''}`}>Reflexive ↔ Reflexive</div>
            <div className={`pair ${phase >= 4 ? '' : ''}`}>Host ↔ Host</div>
            <div className={`pair ${phase >= 4 ? '' : ''}`}>Relay ↔ Relay</div>
          </div>
        </div>
      )}

      <div className="info-panel">
        <h3>📘 Key Concepts</h3>
        <ul>
          <li><strong>ICE Candidates:</strong> Possible network endpoints (host, reflexive, relay)</li>
          <li><strong>STUN:</strong> Discovers public-facing mapped addresses through NAT</li>
          <li><strong>TURN:</strong> Relays traffic when direct connectivity is impossible</li>
          <li><strong>Checks:</strong> STUN binding requests probe candidate pairs for reachability</li>
          <li><strong>Nomination:</strong> Chooses the best working pair for transport</li>
        </ul>
      </div>
    </div>
  )
}

export default ICEDemo
