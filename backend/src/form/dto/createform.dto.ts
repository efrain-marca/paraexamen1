import { IsBoolean, IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength, Min } from 'class-validator';

export class CreateFormDto {

  @IsUUID()
  @IsOptional() 
  @IsNotEmpty()
  id?: string;

  // Datos básicos
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  // Datos del usuario que llena el formulario
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  phone?: string;

  // Otros campos
  @IsString()
  @IsOptional()
  @MaxLength(100)
  category?: string;

  @IsString()
  @IsOptional()
  message?: string;

  //  Booleanos
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsBoolean()
  @IsOptional()
  isApproved?: boolean;

  @IsBoolean()
  @IsOptional()
  isReviewed?: boolean;

  // Número
  @IsInt()
  @Min(0)
  @IsOptional()
  priority?: number;

  // 🔗 Relación (recibes el id del usuario)
  @IsUUID()
  @IsNotEmpty()
  userId: string;
}