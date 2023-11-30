import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { PrismaModule } from '../../src/prisma/prisma.module';
import { PrismaService } from '../../src/prisma/prisma.service';
import { e2e } from '../utils/e2e-utils';

describe('AppController (e2e)', () => {
    let app: INestApplication;
    let prisma: PrismaService;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule, PrismaModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        prisma = app.get(PrismaService);

        new e2e().cleanDB(prisma);
        await app.init();
    });

    afterAll(async () => {
        await prisma.$disconnect();
    })
    it('POST /sign-up => should respond with status 201 when User is created', () => {
        return request(app.getHttpServer())
            .post('/sign-up')
            .send({ name: "Andressa", email: "andressa@gmail.com", password: "12345678" })
            .expect(HttpStatus.CREATED)
    })

    /* it('POST /sign-up => should respond with status 404 when User already exist', async () => {
        //const user = await new CreateUser();
        return request(app.getHttpServer())
            .post('/sign-up')
            .send({ name: "Andressa", email: "andressa@gmail.com", password: "12345678" })
            .expect(HttpStatus.CREATED)
    }) */
});
