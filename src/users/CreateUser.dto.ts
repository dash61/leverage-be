import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(40)
    userName: string;

    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(30)
    password: string;

    @IsNotEmpty()
    @IsEmail()
    userEmail: string;
}
