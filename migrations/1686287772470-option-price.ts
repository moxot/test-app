import { MigrationInterface, QueryRunner } from 'typeorm';

export class OptionPrice1686287772470 implements MigrationInterface {
  name = 'OptionPrice1686287772470';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "menu_item_option_entity" ADD "price" numeric NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "menu_item_option_entity" DROP COLUMN "price"`,
    );
  }
}
