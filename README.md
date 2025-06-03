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

---

Stay tuned for consumer apps and data visualization dashboards.

