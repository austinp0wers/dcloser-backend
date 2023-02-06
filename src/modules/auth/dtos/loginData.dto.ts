import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength } from 'class-validator';

export class LoginDataDto {
  @ApiProperty()
  @IsString()
  @IsEmail()
  @MaxLength(128)
  readonly email: string;

  @ApiProperty()
  @IsString()
  @MaxLength(128)
  readonly password: string;
}
