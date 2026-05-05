import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FormEntity } from 'src/models/form/form.entity';
import { UserEntity } from 'src/models/user/user.entity';
import { Like, Repository } from 'typeorm';
import { CreateFormDto } from './dto/createform.dto';

@Injectable()
export class FormService {
  constructor(
    @InjectRepository(FormEntity)
    private formRepository: Repository<FormEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  // LISTAR 
  public async getAll(page = 1, limit = 10, search: string = '') {
    const whereCondicion: any = {};

    if (search !== '') {
      whereCondicion.title = Like(`%${search}%`);
      // si quieres buscar también por email:
      // whereCondicion = [
      //   { title: Like(`%${search}%`) },
      //   { email: Like(`%${search}%`) },
      // ];
    }

    const [data, total] = await this.formRepository.findAndCount({
      relations: ['user'], //  incluye usuario
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
      where: whereCondicion,
    });

    return {
      data,
      total,
      page,
      limit,
      lastPage: Math.ceil(total / limit),
    };
  }

  // CREAR
  async create(dto: CreateFormDto) {
    const user = await this.userRepository.findOne({ where: { id: dto.userId } });
    if (!user) {
      throw new BadRequestException('El usuario especificado no existe. Debes iniciar sesión con un usuario válido.');
    }

    const form = this.formRepository.create({
      ...dto,
      user,
    });

    return this.formRepository.save(form);
  }

  // BUSCAR UNO
  async findOne(id: string) {
    return this.formRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  // ACTUALIZAR
  async update(id: string, value: any) {
    await this.formRepository.update(id, value);
    return this.findOne(id);
  }

  // ELIMINAR
  async remove(id: string) {
    return this.formRepository.delete(id);
  }
}