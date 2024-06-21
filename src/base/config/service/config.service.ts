import { Injectable } from "@nestjs/common";
import { Constants } from "src/base/model/constants";
import { AppInfo } from "../model/app.info.entity";


@Injectable()
export class ConfigService {
  constructor() {}

  async appInfo(): Promise<AppInfo> {
    const info = new AppInfo()
    info.phone = Constants.phone,
    info.facebookLink = Constants.facebookLink,
    info.instagramLink = Constants.instagramLink
    info.deliveryTime = Constants.deliveryTime;
    return info
  }  
}
