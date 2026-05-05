import { Module } from '@nestjs/common';
import { FormController } from './form.controller';
import { FormService } from './form.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormEntity } from 'src/models/form/form.entity';
import { UserEntity } from 'src/models/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FormEntity, UserEntity])],
  controllers: [FormController],
  providers: [FormService],
})
export class FormModule {}
