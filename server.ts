import 'reflect-metadata';
import { createExpressServer, useContainer, RoutingControllersOptions } from 'routing-controllers';
import { Container } from 'typedi';
import { createConnection, ConnectionOptions } from 'typeorm';
import express, { Application } from 'express';
import { join } from 'path';

useContainer(Container);

export class MyApp {

  constructor() { }

  dbConfig() {
    const opts: ConnectionOptions = {
      type: 'sqlite',
      name: 'default',
      database: `${process.cwd()}/db-desktop.sqlite`,
      entities: [`${__dirname}/model/*{.js,.ts}`],
      synchronize: true,
      logging: [
        'error',
        // 'query',
        // 'schema'
      ],
    }

    return createConnection(opts)
  }

  start(): Application {

    const opts: RoutingControllersOptions = {
      routePrefix: '/api',
      cors: true,
      classTransformer: true,
      controllers: [`${__dirname}/controllers/*.ts`, `${__dirname}/controllers/*.js`],
      middlewares: [`${__dirname}/middlewares/*.ts`, `${__dirname}/middlewares/*.js`],
      // interceptors: [__dirname + '/interceptors/*.js'],
    }

    const app: Application = createExpressServer(opts);

    app.use(express.static(join(__dirname, '/public')))
      .get('*', (req, res, next) => {
        console.log(`express:req from ${req.originalUrl}`);
        console.log(`express:req type ${req.method}`);
        next();
      });

    return app;
  }
}





