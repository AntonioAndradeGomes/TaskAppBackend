import {MigrationInterface, QueryRunner} from "typeorm";

export class UserTaskRelationship1614785918004 implements MigrationInterface {
    name = 'UserTaskRelationship1614785918004'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `tasks` ADD `userId` varchar(36) NOT NULL");
        await queryRunner.query("ALTER TABLE `tasks` ADD CONSTRAINT `FK_166bd96559cb38595d392f75a35` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `tasks` DROP FOREIGN KEY `FK_166bd96559cb38595d392f75a35`");
        await queryRunner.query("ALTER TABLE `tasks` DROP COLUMN `userId`");
    }

}
