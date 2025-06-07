import axios from 'axios'

interface Payload {
  sessionId: string
  userId: number
  pageUrl: string
  viewport: Viewport
  screen: Screen
  deviceType: 'DESKTOP' | 'MOBILE' | 'TABLET'
  browserInfo: string
  events: MouseEvent[]
}

interface Viewport {
  width: number
  height: number
}

interface Screen {
  width: number
  height: number
}

interface MouseEvent {
  x: number
  y: number
  timestamp: number
  eventType: 'MOUSE_MOVE'
}

;(async (): Promise<void> => {
  const concurrency = 1000
  const startTime = Date.now()
  while (true) {
    await Promise.all(
      Array.from({length: concurrency}, () => sendMouseTrackData(startTime)),
    )
  }
})()

async function sendMouseTrackData(startTime: number): Promise<void> {
  const payload: Payload = getPayload()

  try {
    await axios.post(
      'http://localhost:3000/telemetry-ingest/api/mouse-track/ingest',
      payload,
    )
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    const message = err?.message || ''
    console.error('Insert failed:', err.message)

    if (
      message.includes('socket hang up') ||
      message.includes('read ECONNRESET')
    ) {
      const endTime = Date.now()
      const durationMs = endTime - startTime
      const durationSec = (durationMs / 1000).toFixed(2)

      console.error('❌ Critical error detected: terminating script.')
      console.log(
        `⏱️ Total run duration: ${durationSec} seconds (${durationMs} ms)`,
      )
      process.exit(1)
    }
  }
}

function getPayload(): Payload {
  return {
    sessionId: 'abc123-session-uuid',
    userId: 1234,
    pageUrl: 'https://example.com/product/789',
    viewport: {
      width: 1366,
      height: 768,
    },
    screen: {
      width: 1920,
      height: 1080,
    },
    deviceType: 'DESKTOP',
    browserInfo: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)...',
    events: Array.from({length: 100}, () => ({
      x: Math.floor(Math.random() * 1280),
      y: Math.floor(Math.random() * 720),
      timestamp: Date.now(),
      eventType: 'MOUSE_MOVE',
    })),
  }
}
