export class RegisterUserDto {
  constructor(
    public email: string,
    public password: string,
    public name:string,
  ) {}
}
