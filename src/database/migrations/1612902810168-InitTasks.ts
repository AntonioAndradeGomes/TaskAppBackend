import {MigrationInterface, QueryRunner} from "typeorm";

export class InitTasks1612902810168 implements MigrationInterface {
    name = 'InitTasks1612902810168'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `tasks` (`id` varchar(36) NOT NULL, `text_task` varchar(255) NOT NULL, `completion_date` datetime NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `tasks`");
    }

}
