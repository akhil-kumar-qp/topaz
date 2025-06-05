import {Module} from '@nestjs/common'
import {PostgresModule} from './src/modules/postgres/postgres.module'
import {ConfigModule} from '@nestjs/config'
import {setupConfig} from './config/setup-config.method'

@Module({
  imports: [
    PostgresModule,
    ConfigModule.forRoot({
      load: setupConfig(),
      isGlobal: true,
    }),
  ],
})
export class DataInfraModule {}
