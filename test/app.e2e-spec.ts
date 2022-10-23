import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { PrismaService } from '../src/prisma/prisma.service';
import { AuthModule } from '../src/auth/auth.module';
import { BookmarkModule } from '../src/bookmark/bookmark.module';
import { PrismaModule } from '../src/prisma/prisma.module';
import { UserModule } from '../src/user/user.module';
import * as pactum from 'pactum';
import { AuthDto } from 'src/auth/dto';
import { EditUserDto } from 'src/user/dto';
import { CreateBookmarkDto } from 'src/bookmark/dto';

const BASE_TEST_URL = 'http://localhost:3333/';

describe('App e2e', () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        AuthModule,
        UserModule,
        BookmarkModule,
        PrismaModule,
      ],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        //Stripping out the excess properties in the body, that are not used in the DTO
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(3333);
    prismaService = app.get(PrismaService);
    await prismaService.cleanDB();
  });

  afterAll(() => {
    app.close;
  });

  describe('Auth', () => {
    const dto: AuthDto = {
      email: 'vlad@gmail.com',
      password: 'vlad123',
    };
    describe('register', () => {
      it('Should register a new user', () => {
        return pactum
          .spec()
          .post(BASE_TEST_URL.concat('auth/register'))
          .withBody(dto)
          .expectStatus(201);
      });
      it('Should throw if email empty', () => {
        return pactum
          .spec()
          .post(BASE_TEST_URL.concat('auth/register'))
          .withBody({
            password: dto.password,
          })
          .expectStatus(400);
      });
      it('Should throw if password empty', () => {
        return pactum
          .spec()
          .post(BASE_TEST_URL.concat('auth/register'))
          .withBody({
            email: dto.email,
          })
          .expectStatus(400);
      });
    });
    describe('login', () => {
      it('Should register a new user', () => {
        return pactum
          .spec()
          .post(BASE_TEST_URL.concat('auth/login'))
          .withBody(dto)
          .expectStatus(200)
          .stores('userAccessToken', 'access_token');
      });
      it('Should throw if email empty', () => {
        return pactum
          .spec()
          .post(BASE_TEST_URL.concat('auth/login'))
          .withBody({
            password: dto.password,
          })
          .expectStatus(400);
      });
      it('Should throw if password empty', () => {
        return pactum
          .spec()
          .post(BASE_TEST_URL.concat('auth/login'))
          .withBody({
            email: dto.email,
          })
          .expectStatus(400);
      });
    });
  });

  describe('Users', () => {
    describe('Get me', () => {
      it('Should get current user', () => {
        return pactum
          .spec()
          .get(BASE_TEST_URL.concat('users/me'))
          .withHeaders({
            Authorization: 'Bearer $S{userAccessToken}',
          })
          .expectStatus(200);
      });
    });
    describe('Edit user', () => {
      it('Should edit user', () => {
        const dto: EditUserDto = {
          firstName: 'Vladimir',
          email: 'vlad@dracula-tours.com',
        };
        return pactum
          .spec()
          .get(BASE_TEST_URL.concat('users'))
          .withHeaders({
            Authorization: 'Bearer $S{userAccessToken}',
          })
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.firstName)
          .expectBodyContains(dto.email);
      });
    });
  });

  describe('Bookmarks', () => {
    describe('Get empty bookmark', () => {
      it('Should get bookmarks', () => {
        return pactum
          .spec()
          .get(BASE_TEST_URL.concat('bookmarks'))
          .withHeaders({
            Authorization: 'Bearer $S{userAccessToken}',
          })
          .expectStatus(200)
          .expectBody([]);
      });
    });
    describe('Create bookmark', () => {
      const dto: CreateBookmarkDto = {
        title: 'First bookmark',
        link: 'https://youtube.com/test-bookmark',
      };
      it('Should create bookmark', () => {
        return pactum
          .spec()
          .post(BASE_TEST_URL.concat('bookmarks'))
          .withHeaders({
            Authorization: 'Bearer $S{userAccessToken}',
          })
          .withBody(dto)
          .expectStatus(201);
      });
    });
    describe('Get bookmark', () => {
      it.todo('');
    });
    describe('Get bookmark by id', () => {
      it.todo('');
    });
    describe('Edit bookmark', () => {
      it.todo('');
    });
    describe('Delete bookmark', () => {
      it.todo('');
    });
  });
});
