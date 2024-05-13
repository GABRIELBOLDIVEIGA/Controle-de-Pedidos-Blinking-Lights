import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { ProdutoModule } from './modules/produto/produto.module';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422,
      transform: true,
    }),
  );

  // session
  app.use(
    session({
      name: 'KMB_SESSION_ID',
      secret: 'KmbSecretPassport',
      saveUninitialized: true,
      resave: false,
      cookie: {
        maxAge: 7 * 24 * 60 * 1000, // 1 semana
        secure: true,
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  //Swagger
  const config = new DocumentBuilder()
    .setTitle('Controle de Pedidos Blinking-Lights')
    .setDescription(
      'Backend desenvolvido em NestJS com Mongoose, TypeScript e MongoDB',
    )
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'Header',
      },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Users
  const optUser = new DocumentBuilder()
    .setTitle('User')
    .setDescription('User Model')
    .setVersion('1.0')
    .addTag('User')
    .build();

  const docUser = SwaggerModule.createDocument(app, optUser, {
    include: [UsuarioModule],
  });

  SwaggerModule.setup('api/user', app, docUser);

  // Products
  const optProduct = new DocumentBuilder()
    .setTitle('Product')
    .setDescription('Product Model')
    .setVersion('1.0')
    .addTag('Product')
    .build();

  const docProduct = SwaggerModule.createDocument(app, optProduct, {
    include: [ProdutoModule],
  });

  SwaggerModule.setup('api/product', app, docProduct);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.enableCors({
    allowedHeaders: ['Content-Type', 'Origin', 'Authorization'],
    origin: ['*', 'http://localhost:5173', 'https://kmbrodizios.vercel.app'],
    credentials: true,
  });

  await app.listen(process.env.PORT || 3030);

  console.clear();

  console.log(`Base Url: http://localhost:${process.env.PORT}`);
  console.log(`Swagger: http://localhost:${process.env.PORT}/api/`);
}
bootstrap();
