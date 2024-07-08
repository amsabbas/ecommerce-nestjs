import { IsNotEmpty } from "class-validator";

export class EditAreaDTO{
  @IsNotEmpty()
  id : number
  @IsNotEmpty()
  name: string;
}
