import { FormEntity } from 'src/models/form/form.entity';
import { UserEntity } from '../models/user/user.entity';

export const configDB = {
  type: (process.env.DATABASE_TYPE as 'mysql') || 'mysql',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT || '3306', 10),
  username: process.env.DATABASE_USER || 'root',
  password: process.env.DATABASE_PASSWORD || '123456',
  database: process.env.DATABASE_NAME || 'examen2',
  entities: [ UserEntity,FormEntity],
  synchronize: true, // en desarrollo permite crear tablas automáticamente
  // false en producción, usar migraciones
};
