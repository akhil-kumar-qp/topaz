export interface PostgresConfig {
  name: string
  host: string
  username: string
  password: string
  port: number
  database: string
  entities: string[]
}
