import { IsNotEmpty}  from '@nestjs/class-validator';

export class NotificationRequestDTO {
  @IsNotEmpty()
  public fcm_token: string;

}