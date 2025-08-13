import {Test, TestingModule} from '@nestjs/testing'
import {INestApplication} from '@nestjs/common'
import * as request from 'supertest'
import {TelemetryIngestModule} from './../src/telemetry-ingest.module'

describe('TelemetryIngestController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TelemetryIngestModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    app.setGlobalPrefix('/telemetry-ingest/api')
    await app.init()
  })

  it('/telemetry-ingest/api (GET)', () => {
    return request(app.getHttpServer())
      .get('/telemetry-ingest/api')
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual({ data: 'Hello From TelemetryIngestService' })
      })
  })

  it('/telemetry-ingest/api/health (GET)', () => {
    return request(app.getHttpServer())
      .get('/telemetry-ingest/api/health')
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual({ data: 'Up' })
      })
  })
})
