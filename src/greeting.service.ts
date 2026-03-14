import { Service } from "@xtaskjs/core";
import { appConfig } from "./app.config";

@Service({ scope: "singleton" })
export class GreetingService {
  getHomeModel() {
    return {
      title: appConfig.name,
      subtitle: appConfig.description,
      repository: "https://github.com/xtaskjs/xtask",
      runtime: "Express adapter via @xtaskjs/express-http",
    };
  }

  getHealthSnapshot() {
    return {
      status: "ok",
      framework: "xTaskJS",
      adapter: "express",
      timestamp: new Date().toISOString(),
    };
  }
}