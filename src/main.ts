import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("/api/v1");

  //Enable cors
  app.enableCors();

  // global exception handler
  app.useGlobalFilters();

  app.getHttpAdapter().getInstance().set("trust proxy", 1);

  const config = app.get(ConfigService, { strict: false });
  const PORT = process.env.PORT;
  await app.listen(PORT);
  console.log("BOOTSTRAP DETAILS: ", {
    PORT: PORT,
    SERVER: "UP",
  });
}

bootstrap();
