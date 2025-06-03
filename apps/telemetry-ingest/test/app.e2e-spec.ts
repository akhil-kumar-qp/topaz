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
    await app.init()
  })

  it('/telemetry-ingest/api (GET)', () => {
    return request(app.getHttpServer())
      .get('/telemetry-ingest/api')
      .expect(200)
      .expect('Hello From TelemetryIngestService')
  })
})
