import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export default (app: INestApplication, version: string, port: number): void => {
  const servers: string[] = [`http://localhost:${port}/api`];
  const swaggerConfig = new DocumentBuilder()
    .setTitle('burrito-api')
    .setDescription('burrito ordering api')
    .addBearerAuth()
    .setVersion(version);

  const serversAppliedConfig = servers.reduce(
    (acc, server) => acc.addServer(server),
    swaggerConfig,
  );

  const buildConfig = serversAppliedConfig.build();

  const document = SwaggerModule.createDocument(app, buildConfig);
  SwaggerModule.setup('api', app, document);
};
