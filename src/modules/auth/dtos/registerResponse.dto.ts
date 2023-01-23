export class RegisterResponseDto {
  code: number;
  message: string;
  success: boolean;

  constructor(code: number, message: string, success: boolean) {
    this.code = code;
    this.message = message;
    this.success = success;
  }
}
