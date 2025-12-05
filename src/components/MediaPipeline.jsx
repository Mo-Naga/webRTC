import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import './MediaPipeline.css'

const MediaPipeline = () => {
  const videoRefA = useRef(null)
  const videoRefB = useRef(null)
  const [running, setRunning] = useState(false)
  const [error, setError] = useState('')

  const startLocalDemo = async () => {
    setError('')
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      if (videoRefA.current) {
        videoRefA.current.srcObject = stream
        await videoRefA.current.play()
      }
      // Mirror media locally to show RTP conceptually
      if (videoRefB.current) {
        videoRefB.current.srcObject = stream
        await videoRefB.current.play()
      }
      setRunning(true)
    } catch (e) {
      setError('Camera/Microphone access failed. Grant permissions to demo local media.')
    }
  }

  const stopLocalDemo = () => {
    const streamA = videoRefA.current?.srcObject
    if (streamA) {
      streamA.getTracks().forEach(t => t.stop())
    }
    videoRefA.current && (videoRefA.current.srcObject = null)
    videoRefB.current && (videoRefB.current.srcObject = null)
    setRunning(false)
  }

  return (
    <div className="media-demo">
      <h2>Media Pipeline: RTP over DTLS-SRTP</h2>
      <p className="demo-description">Preview local media to illustrate capture, encode, encrypt, send, and render stages.</p>
      <div className="demo-controls">
        <button onClick={startLocalDemo} disabled={running}>Start Local Preview</button>
        <button onClick={stopLocalDemo} disabled={!running}>Stop</button>
        <div className="step-indicator">{running ? 'Streaming locally' : 'Idle'}</div>
      </div>

      {error && <div className="error">{error}</div>}

      <div className="pipeline">
        <div className="stage capture">Capture</div>
        <div className="stage encode">Encode (VP8/Opus)</div>
        <div className="stage secure">DTLS -&gt; SRTP</div>
        <div className="stage transport">Transport (ICE Path)</div>
        <div className="stage render">Render</div>
      </div>

      <div className="video-area">
        <div className="video-box">
          <h3>Peer A (Local)</h3>
          <video ref={videoRefA} playsInline muted className="video" />
        </div>
        <div className="video-box">
          <h3>Peer B (Remote)</h3>
          <video ref={videoRefB} playsInline className="video" />
        </div>
      </div>

      <div className="info-panel">
        <h3>📘 Key Concepts</h3>
        <ul>
          <li><strong>RTP:</strong> Media packets carrying audio/video frames</li>
          <li><strong>SRTP:</strong> RTP encrypted with keys from DTLS</li>
          <li><strong>Codecs:</strong> VP8/H.264 for video, Opus for audio</li>
          <li><strong>Tracks:</strong> `MediaStreamTrack` objects added to peer connections</li>
        </ul>
      </div>
    </div>
  )
}

export default MediaPipeline
