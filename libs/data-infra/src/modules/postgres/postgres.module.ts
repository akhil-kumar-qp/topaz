import {Module} from '@nestjs/common'
import {TypeOrmModule, TypeOrmModuleOptions} from '@nestjs/typeorm'
import {ConfigService} from '@nestjs/config'
import {loadEnvConfig} from 'libs/data-infra/config/setup-config.method'
const {postgres} = loadEnvConfig()

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        const connectionOptions: TypeOrmModuleOptions = {
          type: 'postgres',
          autoLoadEntities: true,
          synchronize: false,
          maxQueryExecutionTime: 2000,
          logging: ['error'],
        }

        return {
          ...postgres,
          ...connectionOptions,
        }
      },
      inject: [ConfigService],
      name: postgres.name,
    }),
  ],
})
export class PostgresModule {}
