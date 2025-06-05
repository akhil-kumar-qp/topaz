import {EnvConfig} from 'libs/data-infra/config/env-config.interface'
import {DataSource} from 'typeorm'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const envJson: EnvConfig = require(`./libs/data-infra/config/envs/.env.${process.env.ENVIRONMENT}.json`)

const database = envJson.postgres

export const connectionSource = new DataSource({
  migrationsTableName: 'migrations',
  type: 'postgres',
  host: database.host,
  port: database.port,
  username: database.username,
  password: database.password,
  database: database.database,
  logging: false,
  synchronize: false,
  name: database.name,
  migrations: ['./migrations/**/*{.ts,.js}'],
  entities: ['dist/apps/**/*.entity.js'],
})
