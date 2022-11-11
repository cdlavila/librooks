import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'news' })
export class News {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'date',
    nullable: false,
    unique: false,
    name: '',
  })
  date: Date;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: false,
    name: 'description',
  })
  description: string;
}
