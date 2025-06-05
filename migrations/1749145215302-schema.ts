import {MigrationInterface, QueryRunner} from 'typeorm'

export class Schema1749145215302 implements MigrationInterface {
  name = 'Schema1749145215302'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "mouse_track" (
        "id" SERIAL NOT NULL, 
        "user_id" integer, 
        "session_id" character varying(100) NOT NULL, 
        "page_url" text NOT NULL, 
        "x_coordinate" integer NOT NULL, 
        "y_coordinate" integer NOT NULL, 
        "view_port_width" integer, 
        "view_port_height" integer, 
        "screen_width" integer, 
        "screen_height" integer, 
        "timestamp" bigint NOT NULL, 
        "event_type" character varying(100) NOT NULL, 
        "browser_info" text NOT NULL, 
        "device_type" character varying(50) NOT NULL, 
        "creation_date" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, 
        "updation_date" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, 
        CONSTRAINT "PK_mouse_track_id" PRIMARY KEY ("id"))`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "mouse_track"`)
  }
}
