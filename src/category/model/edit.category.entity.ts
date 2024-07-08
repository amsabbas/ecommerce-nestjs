import { IsNotEmpty } from "class-validator";

export class EditCategoryDTO{
  @IsNotEmpty()
  id : number
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  name_ar: string;
}
