import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class ReqSaveBusinessDto {
  @IsString()
  @Length(1, 256)
  @ApiProperty()
  private readonly name: string;
}
