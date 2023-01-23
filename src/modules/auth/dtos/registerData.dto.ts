import { UserRoleEnum } from './../../user/enums/role.enum';
import { IsString, IsEmail, MaxLength, IsEnum } from 'class-validator';

export class RegisterDataDto {
  @IsString()
  @IsEmail()
  @MaxLength(128)
  email: string;

  @IsString()
  @MaxLength(128)
  name: string;

  @IsString()
  @MaxLength(128)
  phone: string;

  @IsString()
  password: string;

  @IsEnum(UserRoleEnum)
  role: UserRoleEnum;
}
