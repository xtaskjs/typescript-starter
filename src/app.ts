import "reflect-metadata";
import express, { Express } from "express";
import { CreateApplication, XTaskHttpApplication } from "@xtaskjs/core";
import { ExpressAdapter, ExpressAdapterOptions } from "@xtaskjs/express-http";
import { appConfig } from "./app.config";

export interface CreateStarterAppOptions {
  autoListen?: boolean;
  host?: string;
  port?: number;
  adapterOptions?: ExpressAdapterOptions;
}

export interface StarterApplication {
  expressApp: Express;
  application: XTaskHttpApplication;
}

export async function createStarterApplication(
  options: CreateStarterAppOptions = {},
): Promise<StarterApplication> {
  const expressApp = express();
  expressApp.use(express.json());

  const application = await CreateApplication({
    adapter: new ExpressAdapter(expressApp, options.adapterOptions),
    autoListen: options.autoListen ?? false,
    server: {
      host: options.host ?? appConfig.host,
      port: options.port ?? appConfig.port,
    },
  });

  return {
    expressApp,
    application,
  };
}

export async function startStarterApplication(): Promise<StarterApplication> {
  return createStarterApplication({ autoListen: true });
}