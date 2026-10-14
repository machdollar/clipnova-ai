
import { useState } from 'react'
import {
  Scissors, LayoutDashboard, Video, Sparkles, Captions,
  FileText, Settings, Search, Bell, Plus, Upload,
  Play, Clock, TrendingUp, ChevronRight, Menu, X,
  WandSparkles, Download, Zap
} from 'lucide-react'

const tools = [
  { icon: Scissors, title: 'AI Clip Generator', desc: 'Turn long videos into engaging shorts', color: 'blue' },
  { icon: Captions, title: 'Auto Captions', desc: 'Generate stylish subtitles automatically', color: 'purple' },
  { icon: WandSparkles, title: 'AI Video Editor', desc: 'Polish your clips with smart editing', color: 'orange' },
  { icon: FileText, title: 'Titles & Descriptions', desc: 'Create content ready to publish', color: 'green' },
]

const navigation = [
  { name: 'Dashboard', icon: LayoutDashboard },
  { name: 'AI Clip Generator', icon: Scissors },
  { name: 'My Projects', icon: Video },
  { name: 'Auto Captions', icon: Captions },
  { name: 'Transcripts', icon: FileText },
]

export default function App() {
  const [active, setActive] = useState('Dashboard')
  const [menuOpen, setMenuOpen] = useState(false)
  const [videoName, setVideoName] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [clipLength, setClipLength] = useState('30–60 seconds')
  const [status, setStatus] = useState('')
  const [file, setFile] = useState(null)

  function selectFile(event) {
    const selected = event.target.files?.[0]
    if (!selected) return
    if (!selected.type.startsWith('video/')) {
      setStatus('Please select a valid video file.')
      return
    }
    setFile(selected)
    setVideoName(selected.name)
    setStatus('')
  }

  function startClipping() {
    if (!file && !videoUrl.trim()) {
      setStatus('Upload a video or enter a video URL to get started.')
      return
    }
    setStatus(
      file
        ? `Video "${file.name}" is selected. Connect the AI processing engine to generate clips.`
        : 'Video URL added. Connect a compatible video importer to process this link.'
    )
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${menuOpen ? 'sidebar-open' : ''}`}>
        <div className="brand">
          <div className="brand-icon"><Scissors size={23} /></div>
          <div>
            <div className="brand-name">ClipNova <span>AI</span></div>
            <div className="brand-subtitle">VIDEO WORKSPACE</div>
          </div>
          <button className="mobile-close" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X size={20} /></button>
        </div>

        <div className="nav-label">WORKSPACE</div>
        <nav className="navigation">
          {navigation.map(({ name, icon: Icon }) => (
            <button
              key={name}
              className={`nav-item ${active === name ? 'nav-active' : ''}`}
              onClick={() => { setActive(name); setMenuOpen(false) }}
            >
              <Icon size={19} />
              <span>{name}</span>
              {name === 'AI Clip Generator' && <span className="nav-new">AI</span>}
            </button>
          ))}
        </nav>

        <div className="nav-label tools-label">CREATE</div>
        <nav className="navigation">
          {[
            { name: 'Video Summaries', icon: FileText },
            { name: 'AI Tools', icon: Sparkles },
            { name: 'Settings', icon: Settings },
          ].map(({ name, icon: Icon }) => (
            <button key={name} className={`nav-item ${active === name ? 'nav-active' : ''}`} onClick={() => { setActive(name); setMenuOpen(false) }}>
              <Icon size={19} /><span>{name}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="upgrade-card">
            <div className="upgrade-icon"><Zap size={18} /></div>
            <strong>Your creative studio</strong>
            <p>All your video tools in one place.</p>
          </div>
          <div className="profile">
            <div className="avatar">CN</div>
            <div className="profile-info"><strong>Creator</strong><span>Video workspace</span></div>
            <Settings size={17} className="profile-settings" />
          </div>
        </div>
      </aside>

      {menuOpen && <button className="sidebar-overlay" aria-label="Close navigation" onClick={() => setMenuOpen(false)} />}

      <main className="main-area">
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu size={22} /></button>
          <div className="breadcrumb">Workspace <ChevronRight size={15} /> <strong>{active}</strong></div>
          <div className="topbar-actions">
            <div className="status-pill"><span /> AI STUDIO</div>
            <button className="icon-button" aria-label="Search" onClick={() => setStatus('Search your projects from My Projects.') }><Search size={19} /></button>
            <button className="icon-button notification-button" aria-label="Notifications" onClick={() => setStatus('You are all caught up!')}><Bell size={19} /></button>
            <div className="top-avatar">CN</div>
          </div>
        </header>

        <div className="page-content">
          <section className="welcome-row">
            <div>
              <div className="eyebrow"><Sparkles size={15} /> YOUR AI VIDEO WORKSPACE</div>
              <h1>{active === 'Dashboard' ? 'Create something amazing.' : active}</h1>
              <p className="welcome-description">
                Turn your long videos into captivating short-form content.
              </p>
            </div>
            <button className="primary-button" onClick={() => document.getElementById('video-upload')?.click()}>
              <Plus size={18} /> New project
            </button>
          </section>

          <section className="hero-card">
            <div className="hero-copy">
              <div className="hero-badge"><Sparkles size={14} /> AI-POWERED VIDEO CREATION</div>
              <h2>Your next viral clip<br />starts <span>right here.</span></h2>
              <p>Find the best moments in your videos, create shorts, and prepare content for your favorite platforms.</p>
              <button className="hero-button" onClick={() => document.getElementById('video-upload')?.click()}>
                <Scissors size={18} /> Start clipping <ChevronRight size={17} />
              </button>
              <div className="hero-note"><Zap size={14} /> Your creative workflow, simplified.</div>
            </div>
            <div className="hero-art">
              <div className="art-glow" />
              <div className="video-window">
                <div className="video-window-top"><span /><span /><span /><div>clipnova_ai.mp4</div></div>
                <div className="video-preview">
                  <div className="preview-circle"><Play size={27} fill="currentColor" /></div>
                  <div className="preview-caption">YOUR STORY, <strong>REIMAGINED.</strong></div>
                  <div className="preview-tag">AI CLIP STUDIO</div>
                </div>
                <div className="timeline">
                  <div className="timeline-track"><span /><span /><span /><span /><span /></div>
                  <div className="timeline-bottom"><span>00:12</span><span>00:48</span></div>
                </div>
              </div>
              <div className="floating-chip chip-top"><Sparkles size={15} /> Smart highlights</div>
              <div className="floating-chip chip-bottom"><Captions size={15} /> Auto captions</div>
            </div>
          </section>

          <section className="stats-grid">
            <div className="stat-card"><div className="stat-icon blue-bg"><Video size={19} /></div><div><span className="stat-label">Projects</span><strong>0</strong><span className="stat-foot">Start your first project</span></div></div>
            <div className="stat-card"><div className="stat-icon purple-bg"><Scissors size={19} /></div><div><span className="stat-label">Clips created</span><strong>0</strong><span className="stat-foot">Your clips will appear here</span></div></div>
            <div className="stat-card"><div className="stat-icon green-bg"><Clock size={19} /></div><div><span className="stat-label">Video minutes</span><strong>0</strong><span className="stat-foot">Ready for your next video</span></div></div>
            <div className="stat-card"><div className="stat-icon orange-bg"><TrendingUp size={19} /></div><div><span className="stat-label">Clip potential</span><strong>—</strong><span className="stat-foot">AI estimates, not guarantees</span></div></div>
          </section>

          <section className="workspace-grid">
            <div className="panel upload-panel" id="upload-panel">
              <div className="section-heading">
                <div><h3>Start with a video</h3><p>Upload a video or add a compatible video link.</p></div>
                <span className="step-label">STEP 01</span>
              </div>

              <label className="upload-zone" htmlFor="video-upload">
                <input id="video-upload" type="file" accept="video/*" onChange={selectFile} />
                <div className="upload-icon"><Upload size={23} /></div>
                <strong>{videoName || 'Drop your video here'}</strong>
                <span>{videoName ? 'Video selected — ready for setup' : 'or tap to browse your device'}</span>
                <div className="file-types">MP4 · MOV · WEBM</div>
              </label>

              <div className="or-divider"><span>OR USE A VIDEO LINK</span></div>
              <div className="url-input">
                <Video size={18} />
                <input value={videoUrl} onChange={e => setVideoUrl(e.target.value)} placeholder="Paste a supported video URL..." />
              </div>

              <div className="options-row">
                <label htmlFor="clip-length">Clip duration</label>
                <select id="clip-length" value={clipLength} onChange={e => setClipLength(e.target.value)}>
                  <option>15–30 seconds</option>
                  <option>30–60 seconds</option>
                  <option>60–90 seconds</option>
                  <option>90–180 seconds</option>
                </select>
              </div>

              <button className="generate-button" onClick={startClipping}><Sparkles size={18} /> Find my best clips <ChevronRight size={18} /></button>
              {status && <div className="status-message" role="status">{status}</div>}
              <p className="privacy-note">Your video stays in your workflow. Processing requires a connected backend.</p>
            </div>

            <div className="right-column">
              <div className="panel tools-panel">
                <div className="section-heading"><div><h3>Creative tools</h3><p>Everything you need to get started.</p></div><button className="text-link" onClick={() => setActive('AI Tools')}>Explore <ChevronRight size={15} /></button></div>
                <div className="tools-list">
                  {tools.map(({ icon: Icon, title, desc, color }) => (
                    <button className="tool-row" key={title} onClick={() => { setActive(title); setStatus(`${title} selected. Its processing workflow will be connected in the next development stages.`) }}>
                      <div className={`tool-icon ${color}`}><Icon size={20} /></div>
                      <div className="tool-info"><strong>{title}</strong><span>{desc}</span></div>
                      <ChevronRight size={17} className="tool-arrow" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="tip-card">
                <div className="tip-icon"><Sparkles size={20} /></div>
                <div><strong>Creator tip</strong><p>Start with a clear, high-quality video for better transcription and highlight detection.</p></div>
              </div>
            </div>
          </section>

          <footer className="footer"><span>© 2026 ClipNova AI</span><span>Made for creators, powered by AI.</span></footer>
        </div>
      </main>
    </div>
  )
      }
      
