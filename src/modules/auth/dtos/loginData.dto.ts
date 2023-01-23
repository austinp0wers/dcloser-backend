import { IsEmail, IsString, MaxLength } from 'class-validator';

export class LoginDataDto {
  @IsString()
  @IsEmail()
  @MaxLength(128)
  readonly email: string;

  @IsString()
  @MaxLength(128)
  readonly password: string;
}
