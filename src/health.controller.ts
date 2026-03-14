import { Controller, Get, Logger } from "@xtaskjs/common";
import { GreetingService } from "./greeting.service";

@Controller("/health")
export class HealthController {
  constructor(
    private readonly logger: Logger,
    private readonly greetingService: GreetingService,
  ) {}

  @Get("/")
  check() {
    this.logger.info("Health check endpoint called");
    return this.greetingService.getHealthSnapshot();
  }
}