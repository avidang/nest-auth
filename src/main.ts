import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const config = new DocumentBuilder()
		.setTitle("App example")
		.setDescription("The app API description")
		.setVersion("1.0")
		.addBearerAuth()
		.addTag("app")
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("docs", app, document);

	const debug = process.env.NODE_ENV === "development";
	if (debug) {
		app.enableCors();
	}
	await app.listen(3000);
}
bootstrap();
