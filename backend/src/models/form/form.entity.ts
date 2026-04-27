import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity('forms')
export class FormEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  //  Datos básicos
  @Column({ length: 100 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  //  Datos del usuario que llena el formulario
  @Column({ length: 100 })
  name: string;

  @Column({ length: 100 })
  email: string;

  @Column({ length: 20, nullable: true })
  phone: string;

  //  Campos tipo selección / texto
  @Column({ length: 100, nullable: true })
  category: string;

  @Column({ type: 'text', nullable: true })
  message: string;

  // 🔹 Booleanos (true / false)
  @Column({ default: false })
  isActive: boolean;

  @Column({ default: false })
  isApproved: boolean;

  @Column({ default: false })
  isReviewed: boolean;

  // Número / estado
  @Column({ default: 0 })
  priority: number;

  // Fechas automáticas
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relación con usuario
  @ManyToOne(() => UserEntity, (user) => user.forms, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;
}