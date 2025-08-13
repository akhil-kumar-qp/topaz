# Topaz

A modular, scalable event tracking system built with NestJS and Apache Kafka.  
This platform ingests telemetry data (e.g., mouse activity, user behavior) in real-time and processes it for analytics and visualization.

## Features

- ⚡ Real-time event ingestion via Kafka
- 🧩 Modular monorepo structure (producer/consumer separation)
- 📦 Built with NestJS microservices architecture
- 🚀 Ready for local development and cloud deployment
- 🔁 Supports horizontal scaling for both producers and consumers

## Apps

- **telemetry-ingest** – Accepts incoming telemetry events (e.g., mouse tracking) and publishes them to Kafka

## Environments

- Docker-based Kafka clusters for both `dev` (single broker) and `prod` (multi-broker)
- `.env` driven configuration

## API Documentation

### Base URL
- **Development:** `http://localhost:3000/telemetry-ingest/api`
- **Port:** 3000 (configurable via environment)

### Available Endpoints

#### 1. Health Check
- **Endpoint:** `GET /`
- **Description:** Returns system status and health information
- **Response:** 
```json
{
  "success": true,
  "data": "Hello From TelemetryIngestService"
}
```

#### 2. Mouse Tracking Data Ingestion
- **Endpoint:** `POST /mouse-track/ingest`
- **Description:** Ingests mouse tracking telemetry data for analytics
- **Content-Type:** `application/json`

**Request Body:**
```json
{
  "sessionId": "string",
  "userId": 123,
  "pageUrl": "https://example.com/page",
  "viewport": {
    "width": 1920,
    "height": 1080
  },
  "screen": {
    "width": 1920,
    "height": 1080
  },
  "browserInfo": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  "deviceType": "DESKTOP",
  "events": [
    {
      "x": 100,
      "y": 200,
      "timestamp": 1640995200000,
      "eventType": "MOUSE_MOVE"
    },
    {
      "x": 150,
      "y": 250,
      "timestamp": 1640995201000,
      "eventType": "MOUSE_CLICK"
    }
  ]
}
```

**Field Descriptions:**
- `sessionId` (required): Unique session identifier
- `userId` (optional): User ID if available
- `pageUrl` (required): URL of the page being tracked
- `viewport` (required): Browser viewport dimensions
- `screen` (required): Screen resolution
- `browserInfo` (required): Browser user agent string
- `deviceType` (required): Device type enum
- `events` (required): Array of mouse events

**Device Types:**
- `DESKTOP`
- `MOBILE`

**Event Types:**
- `MOUSE_MOVE` - Mouse movement tracking
- `MOUSE_CLICK` - Mouse click events
- `MOUSE_SCROLL` - Mouse scroll events

**Success Response:**
```json
{
  "success": true,
  "data": "Data ingested successfully"
}
```

**Validation Rules:**
- All coordinates (x, y) must be integers
- Timestamps must be integers (Unix timestamp in milliseconds)
- Page URL must be a valid URL format
- Session ID cannot be empty
- Events array cannot be empty

---

Stay tuned for consumer apps and data visualization dashboards.

