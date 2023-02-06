import { ApiProperty } from '@nestjs/swagger';
import { UserRoleEnum } from './../../user/enums/role.enum';
import { IsString, IsEmail, MaxLength, IsEnum } from 'class-validator';

export class RegisterDataDto {
  @ApiProperty()
  @IsString()
  @IsEmail()
  @MaxLength(128)
  email: string;

  @ApiProperty()
  @IsString()
  @MaxLength(128)
  name: string;

  @ApiProperty()
  @IsString()
  @MaxLength(128)
  phone: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsEnum(UserRoleEnum)
  role: UserRoleEnum;
}
