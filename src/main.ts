import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Origin,Accept,Content-Type,Authorization', // Cabeçalhos permitidos
  });
  app.useGlobalPipes(new ValidationPipe());

  const setting = new DocumentBuilder()
    .setTitle("Play Chat - Rest API Documentation")
    .setDescription("Play Chat Rest API Documentation")
    .setVersion("1.0")
    .addTag("Play Chat")
    .build();

  const document = SwaggerModule.createDocument(app, setting);

  SwaggerModule.setup("api", app, document);

  const port = process.env.PORT || 4000;
  await app.listen(port, () => {
    console.log("Server is up and running on port: " + port);
  });
}
bootstrap();
