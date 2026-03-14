import { Controller, Get, Logger } from "@xtaskjs/common";
import { view } from "@xtaskjs/core";
import { GreetingService } from "./greeting.service";

@Controller("/")
export class HomeController {
  constructor(
    private readonly logger: Logger,
    private readonly greetingService: GreetingService,
  ) {}

  @Get("/")
  home() {
    this.logger.info("Rendering starter home page");
    return view("home", this.greetingService.getHomeModel());
  }
}