import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FormEntity } from '../form/form.entity';


@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 255 })
  password: string;

  @OneToMany(() => FormEntity, (form) => form.user)
  forms: FormEntity[];
}
