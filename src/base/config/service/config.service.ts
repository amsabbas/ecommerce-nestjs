import { Injectable } from "@nestjs/common";
import { Constants } from "src/base/model/constants";
import { Config } from "../model/config.entity";


@Injectable()
export class ConfigService {
  constructor() {}

  async getContacts(): Promise<Config> {
    const config = new Config()
    config.phone = Constants.phone,
    config.facebookLink = Constants.facebookLink,
    config.instagramLink = Constants.instagramLink
    return config
  }  
}
