export class OkResponseDto {
  message: string;
  code: number;
  constructor(message: string);

  constructor(message: string, code?: number) {
    this.message = message;
    this.code = code;
  }
}
