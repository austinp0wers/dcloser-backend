import { ApiProperty } from '@nestjs/swagger';

export class BusinessInfoDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}
