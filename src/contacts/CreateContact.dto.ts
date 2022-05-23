import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class CreateContactDto {
    @IsNotEmpty()
    @MinLength(3)
    contactName: string;

    @IsNotEmpty()
    @MinLength(10)
    contactPhone: string;

    @IsNotEmpty()
    @IsEmail()
    contactEmail: string;
}
