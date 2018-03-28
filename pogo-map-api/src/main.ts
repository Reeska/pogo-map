import {NestFactory} from '@nestjs/core';
import {ApplicationModule} from './app.module';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';


async function bootstrap() {
    const app = await NestFactory.create(ApplicationModule);

    app.use(bodyParser.json());
    app.use(cors());

    await app.listen(process.env.PORT || 3000, '0.0.0.0');
}

bootstrap();
