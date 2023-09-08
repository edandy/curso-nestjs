import { AuthBody } from '../interfaces/auth.interface';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthDto implements AuthBody {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
