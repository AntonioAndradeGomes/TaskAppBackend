import {MigrationInterface, QueryRunner} from "typeorm";

export class MigrationDueDateTask1613682749354 implements MigrationInterface {
    name = 'MigrationDueDateTask1613682749354'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `tasks` ADD `due_date` datetime NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `tasks` DROP COLUMN `due_date`");
    }

}
