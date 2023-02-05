import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class ReqSaveMailSentDto {
  @IsBoolean()
  @IsOptional()
  use_password?: boolean;

  @IsString()
  @IsOptional()
  password?: string;

  @IsString()
  @IsNotEmpty()
  business_user_id: string;

  @IsInt()
  @IsNotEmpty()
  proposal_id: number;
}
