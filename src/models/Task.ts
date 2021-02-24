import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("tasks")
export default class Task {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  text_task: string;

  //data estimada para a conclusão da tarefa
  @Column({nullable: true})
  due_date : Date;

  //data da conclusão  -> servir de flag true ou false se a tarefa foi concluida
  @Column({ nullable: true })
  completion_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
