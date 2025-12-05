import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, MessageSquare, FileText } from 'lucide-react'
import './SignalingDemo.css'

const SignalingDemo = () => {
  const [step, setStep] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const steps = [
    { id: 0, title: 'Initial State', desc: 'Two peers want to connect' },
    { id: 1, title: 'Create Offer', desc: 'Peer A creates SDP Offer' },
    { id: 2, title: 'Send Offer', desc: 'Offer sent via signaling server' },
    { id: 3, title: 'Create Answer', desc: 'Peer B creates SDP Answer' },
    { id: 4, title: 'Send Answer', desc: 'Answer sent back to Peer A' },
    { id: 5, title: 'Exchange ICE Candidates', desc: 'Peers exchange ICE candidates via server' },
    { id: 6, title: 'Complete', desc: 'SDP + ICE candidates ready for connection' }
  ]

  const handleNext = () => {
    if (step < steps.length - 1 && !isAnimating) {
      setIsAnimating(true)
      setStep(step + 1)
      setTimeout(() => setIsAnimating(false), 500)
    }
  }

  const handlePrev = () => {
    if (step > 0 && !isAnimating) {
      setIsAnimating(true)
      setStep(step - 1)
      setTimeout(() => setIsAnimating(false), 250)
    }
  }

  const handleReset = () => {
    setStep(0)
    setIsAnimating(false)
  }

  return (
    <div className="signaling-demo">
      <h2>Signaling Phase: SDP Exchange</h2>
      <p className="demo-description">
        Before peers can connect, they must exchange session descriptions (SDP) 
        containing media capabilities, codecs, and network information via a signaling server.
      </p>

      <div className="demo-controls">
        <button onClick={handlePrev} disabled={step === 0 || isAnimating}>
          Prev Step
        </button>
        <button onClick={handleNext} disabled={step >= steps.length - 1 || isAnimating}>
          Next Step
        </button>
        <button onClick={handleReset}>Reset</button>
        <div className="step-indicator">
          Step {step + 1} of {steps.length}: {steps[step].title}
        </div>
      </div>

      <div className="visualization-area">
        {/* Peer A */}
        <div className="peer peer-a">
          <div className="peer-icon">🖥️</div>
          <h3>Peer A (Browser)</h3>
          {step >= 1 && step < 2 && (
            <motion.div
              className="sdp-box offer"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <FileText size={20} />
              <div>
                <strong>SDP Offer</strong>
                <pre>{`v=0
o=- 12345 2 IN IP4 127.0.0.1
s=-
t=0 0
m=video 9 RTP/SAVPF 96
a=rtpmap:96 VP8/90000
m=audio 9 RTP/SAVPF 111
a=rtpmap:111 opus/48000/2`}</pre>
              </div>
            </motion.div>
          )}
          {/* {step >= 4 && step < 5 && (
            <motion.div
              className="sdp-box offer"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              <FileText size={20} />
              <div>
                <strong>SDP Offer (Received)</strong>
                <pre>{`v=0
o=- 12345 2 IN IP4 127.0.0.1
s=-
t=0 0
m=video 9 RTP/SAVPF 96
a=rtpmap:96 VP8/90000
m=audio 9 RTP/SAVPF 111
a=rtpmap:111 opus/48000/2`}</pre>
              </div>
            </motion.div>
          )} */}
          {step >= 4 && step < 5 && (
            <motion.div
              className="sdp-box answer"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              <FileText size={20} />
              <div>
                <strong>SDP Answer (Received)</strong>
                <pre>{`v=0
o=- 67890 2 IN IP4 127.0.0.1
s=-
t=0 0
m=video 9 RTP/SAVPF 96
a=rtpmap:96 VP8/90000
m=audio 9 RTP/SAVPF 111
a=rtpmap:111 opus/48000/2`}</pre>
              </div>
            </motion.div>
          )}
          {step >= 5 && (
            <motion.div
              className="sdp-box ice-candidates"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              <FileText size={20} />
              <div>
                <strong>ICE Candidates</strong>
                <pre>{`candidate:1 1 UDP 2113937151 10.0.0.12 54321
candidate:2 1 UDP 1845501695 203.0.113.5 60012
candidate:3 1 UDP 16777215 turn.example.com 45000`}</pre>
              </div>
            </motion.div>
          )}
        </div>

        {/* Signaling Server */}
        <div className="signaling-server">
          <div className="server-icon">🌐</div>
          <h3>Signaling Server</h3>
          <p>(WebSocket / HTTP)</p>
          
          {step >= 2 && step < 3 && (
            <motion.div
              className="message-badge"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              <MessageSquare size={16} />
              Offer
            </motion.div>
          )}
          
          {step >= 4 &&step<5 && (
            <motion.div
              className="message-badge answer"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              <MessageSquare size={16} />
              Answer
            </motion.div>
          )}
        </div>

        {/* Peer B */}
        <div className="peer peer-b">
          <div className="peer-icon">📱</div>
          <h3>Peer B (Browser)</h3>
          {step >= 2 && step < 3 && (
            <motion.div
              className="sdp-box offer"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              <FileText size={20} />
              <div>
                <strong>SDP Offer (Received)</strong>
                <pre>{`v=0
o=- 12345 2 IN IP4 127.0.0.1
s=-
t=0 0
m=video 9 RTP/SAVPF 96
a=rtpmap:96 VP8/90000
m=audio 9 RTP/SAVPF 111
a=rtpmap:111 opus/48000/2`}</pre>
              </div>
            </motion.div>
          )}
          {step >= 3 && step < 4 && (
            <motion.div
              className="sdp-box answer"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <FileText size={20} />
              <div>
                <strong>SDP Answer</strong>
                <pre>{`v=0
o=- 67890 2 IN IP4 127.0.0.1
s=-
t=0 0
m=video 9 RTP/SAVPF 96
a=rtpmap:96 VP8/90000
m=audio 9 RTP/SAVPF 111
a=rtpmap:111 opus/48000/2`}</pre>
              </div>
            </motion.div>
          )}
          {step >= 5 && (
            <motion.div
              className="sdp-box ice-candidates"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              <FileText size={20} />
              <div>
                <strong>ICE Candidates</strong>
                <pre>{`candidate:1 1 UDP 2113937151 10.0.0.12 54321
candidate:2 1 UDP 1845501695 203.0.113.5 60012
candidate:3 1 UDP 16777215 turn.example.com 45000`}</pre>
              </div>
            </motion.div>
          )}
        </div>

        {/* Animated arrows - Offer: A → Server → B */}
        {step >= 2 && step < 3 && (
          <>
            <motion.div
              className="arrow arrow-a-to-server"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.6 }}
            >
              <ArrowRight size={32} />
            </motion.div>
            <motion.div
              className="arrow arrow-server-to-b"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <ArrowRight size={32} />
            </motion.div>
          </>
        )}

        {/* Animated arrows - Answer: B → Server → A */}
        {step >= 4 && step < 5 && (
          <>
            <motion.div
              className="arrow arrow-b-to-server"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: -1 }}
              transition={{ duration: 0.6 }}
            >
              <ArrowRight size={32} />
            </motion.div>
            <motion.div
              className="arrow arrow-server-to-a"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: -1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <ArrowRight size={32} />
            </motion.div>
          </>
        )}

        {/* ICE Candidates Exchange: A ↔ Server ↔ B */}
        {step >= 5 && (
          <>
            <motion.div
              className="arrow arrow-a-to-server ice"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.6 }}
            >
              <ArrowRight size={32} />
            </motion.div>
            <motion.div
              className="arrow arrow-server-to-b ice"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <ArrowRight size={32} />
            </motion.div>
            <motion.div
              className="arrow arrow-b-to-server ice"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: -1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <ArrowRight size={32} />
            </motion.div>
            <motion.div
              className="arrow arrow-server-to-a ice"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: -1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <ArrowRight size={32} />
            </motion.div>
          </>
        )}
      </div>

      <div className="info-panel">
        <h3>📘 Key Concepts</h3>
        <ul>
          <li><strong>SDP (Session Description Protocol):</strong> Text format describing media capabilities, codecs, timing, and transport</li>
          <li><strong>Offer/Answer Model:</strong> One peer creates offer, other responds with answer</li>
          <li><strong>Signaling Server:</strong> Not part of WebRTC spec - can use WebSocket, HTTP, or any messaging protocol</li>
          <li><strong>Out-of-Band:</strong> Signaling happens through separate channel before P2P connection</li>
        </ul>
      </div>
    </div>
  )
}

export default SignalingDemo
