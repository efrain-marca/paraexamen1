import { Module } from '@nestjs/common';
import { FormController } from './form.controller';
import { FormService } from './form.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormEntity } from 'src/models/form/form.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FormEntity])], // Aquí puedes agregar tus entidades relacionadas con el formulario
  controllers: [FormController],
  providers: [FormService],

})
export class FormModule {}
