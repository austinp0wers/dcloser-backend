import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class ReqSaveMailSentDto {
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  use_password?: boolean;

  @ApiProperty()
  @IsString()
  @IsOptional()
  password?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  business_user_id: string;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  proposal_id: number;
}
