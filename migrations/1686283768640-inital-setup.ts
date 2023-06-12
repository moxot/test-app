import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitalSetup1686283768640 implements MigrationInterface {
  name = 'InitalSetup1686283768640';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."menu_item_entity_size_enum" AS ENUM('small', 'medium', 'large')`,
    );
    await queryRunner.query(
      `CREATE TABLE "menu_item_entity" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "size" "public"."menu_item_entity_size_enum" NOT NULL, "price" numeric NOT NULL, CONSTRAINT "PK_2ba0b234fd10db19e34c8f9db6d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "order_entity" ("id" SERIAL NOT NULL, "totalCost" numeric NOT NULL, CONSTRAINT "PK_428b558237e70f2cd8462e1bea1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "order_item_entity" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "menuItemId" integer, "orderId" integer, CONSTRAINT "PK_c12e105219e59720676c72957dc" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "menu_item_option_entity" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_8ec336f649aec7e4a07e687a0b7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "order_item_entity_options_menu_item_option_entity" ("orderItemEntityId" integer NOT NULL, "menuItemOptionEntityId" integer NOT NULL, CONSTRAINT "PK_508bf305d434db9b803ae208612" PRIMARY KEY ("orderItemEntityId", "menuItemOptionEntityId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4545034a9a330d1613064d5bb9" ON "order_item_entity_options_menu_item_option_entity" ("orderItemEntityId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fee21b90de0ef20fdceb221c34" ON "order_item_entity_options_menu_item_option_entity" ("menuItemOptionEntityId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "order_item_entity" ADD CONSTRAINT "FK_2a3ac55bc269ac3c23f3ef54993" FOREIGN KEY ("menuItemId") REFERENCES "menu_item_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_item_entity" ADD CONSTRAINT "FK_cd7ee8cfd1250200aa78d806f8d" FOREIGN KEY ("orderId") REFERENCES "order_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_item_entity_options_menu_item_option_entity" ADD CONSTRAINT "FK_4545034a9a330d1613064d5bb93" FOREIGN KEY ("orderItemEntityId") REFERENCES "order_item_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_item_entity_options_menu_item_option_entity" ADD CONSTRAINT "FK_fee21b90de0ef20fdceb221c347" FOREIGN KEY ("menuItemOptionEntityId") REFERENCES "menu_item_option_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order_item_entity_options_menu_item_option_entity" DROP CONSTRAINT "FK_fee21b90de0ef20fdceb221c347"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_item_entity_options_menu_item_option_entity" DROP CONSTRAINT "FK_4545034a9a330d1613064d5bb93"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_item_entity" DROP CONSTRAINT "FK_cd7ee8cfd1250200aa78d806f8d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_item_entity" DROP CONSTRAINT "FK_2a3ac55bc269ac3c23f3ef54993"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_fee21b90de0ef20fdceb221c34"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_4545034a9a330d1613064d5bb9"`,
    );
    await queryRunner.query(
      `DROP TABLE "order_item_entity_options_menu_item_option_entity"`,
    );
    await queryRunner.query(`DROP TABLE "menu_item_option_entity"`);
    await queryRunner.query(`DROP TABLE "order_item_entity"`);
    await queryRunner.query(`DROP TABLE "order_entity"`);
    await queryRunner.query(`DROP TABLE "menu_item_entity"`);
    await queryRunner.query(`DROP TYPE "public"."menu_item_entity_size_enum"`);
  }
}
