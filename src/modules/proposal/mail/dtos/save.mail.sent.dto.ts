import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsInt,
} from 'class-validator';

export class SaveMailSentDto {
  @IsString()
  @IsNotEmpty()
  sent_to: string;

  @IsString()
  @IsNotEmpty()
  sent_email: string;

  @IsString()
  @IsNotEmpty()
  business_user_id: string;

  @IsInt()
  @IsNotEmpty()
  proposal_id: number;

  @IsBoolean()
  @IsOptional()
  use_password?: boolean;

  @IsString()
  @IsOptional()
  password?: string;
}
