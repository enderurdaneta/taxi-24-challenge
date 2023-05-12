import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTable1683929028210 implements MigrationInterface {
  name = 'CreateTable1683929028210';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "Driver" (
        "id"                SERIAL                NOT NULL,
        "uid"               uuid                  NOT NULL DEFAULT uuid_generate_v4(),
        "documentTypeId"    smallint              NOT NULL,
        "documentNumber"    integer               NOT NULL,
        "firtName"          character varying     NOT NULL,
        "lastName"          character varying     NOT NULL,
        "email"             character varying     NOT NULL,
        "phone"             character varying     NOT NULL,
        "brand"             character varying     NOT NULL,
        "licensePlate"      character varying     NOT NULL,
        "color"             character varying     NOT NULL,
        "capacity"          smallint              NOT NULL,
        "createdAt"         TIMESTAMP             NOT NULL DEFAULT now(),
        "updatedAt"         TIMESTAMP             NOT NULL DEFAULT now(),
        "deletedAt"         TIMESTAMP             NULL,

        CONSTRAINT "UQ_073a5d055d938d8269411ff9e00" UNIQUE ("documentTypeId", "documentNumber"),

        CONSTRAINT "PK_9b78eddc1b0c643ec4e956eaac5" PRIMARY KEY ("id"))`,
    );

    await queryRunner.query(
      `CREATE TABLE "Passenger" (
        "id"                SERIAL                NOT NULL,
        "uid"               uuid                  NOT NULL DEFAULT uuid_generate_v4(),
        "documentTypeId"    smallint              NOT NULL,
        "documentNumber"    integer               NOT NULL,
        "firtName"          character varying     NOT NULL,
        "lastName"          character varying     NOT NULL,
        "email"             character varying     NOT NULL,
        "phone"             character varying     NOT NULL,
        "createdAt"         TIMESTAMP             NOT NULL DEFAULT now(),
        "updatedAt"         TIMESTAMP             NOT NULL DEFAULT now(),
        "deletedAt"         TIMESTAMP             NULL,
        
        CONSTRAINT "UQ_2f0f61f0ec300552a74bba3d563" UNIQUE ("documentTypeId", "documentNumber"),
        
        CONSTRAINT "PK_710945d96233f0a0beb07fb52d9" PRIMARY KEY ("id"))`,
    );

    await queryRunner.query(
      `CREATE TABLE "Travel" (
        "id"                SERIAL                NOT NULL,
        "uid"               uuid                  NOT NULL DEFAULT uuid_generate_v4(),
        "addresOrigin"      character varying     NOT NULL,
        "addresDestination" character varying     NOT NULL,
        "cost"              money                 NOT NULL,
        "status"            smallint              NOT NULL,
        "createdAt"         TIMESTAMP             NOT NULL DEFAULT now(),
        "updatedAt"         TIMESTAMP             NOT NULL DEFAULT now(),
        "deletedAt"         TIMESTAMP             NULL,

        "driverId" integer,
        "passengerId" integer,
        
        CONSTRAINT "PK_cb11dc9dafbfddc38127c553767" PRIMARY KEY ("id"))`,
    );

    await queryRunner.query(
      `ALTER TABLE "Travel" ADD CONSTRAINT "FK_e1fcfb353a5050f2b9b516d76f1"
      FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE "Travel" ADD CONSTRAINT "FK_3c68ee5b2ff6a09a02b31beb8bf"
      FOREIGN KEY ("passengerId") REFERENCES "Passenger"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `INSERT INTO public."Driver"("documentTypeId","documentNumber","firtName","lastName",email,phone,brand,"licensePlate",color,capacity)
      VALUES (2, 1040322, 'Ender', 'Urdaneta', 'urdanetaenderjose@gmail.com', 3224113131, 'Renault Symbol Luxe', 'F5ED65', 'Negro', 4);
      INSERT INTO public."Driver"("documentTypeId","documentNumber","firtName","lastName",email,phone,brand,"licensePlate",color,capacity)
      VALUES (1, 9706460, 'Carmen', 'Fernandez', 'carmenf@gmail.com', 3225983131, 'Ford Focus Titanium At 2.0', 'L54I844', 'Gris', 3);
      INSERT INTO public."Driver"("documentTypeId","documentNumber","firtName","lastName",email,phone,brand,"licensePlate",color,capacity)
      VALUES (1, 1127639478, 'Diego', 'Garcia', 'diegog@gmail.com', 3224111516, 'Chevrolet Aveo Gt Emotion', 'O45I8F8', 'Amarillo', 3);
      INSERT INTO public."Driver"("documentTypeId","documentNumber","firtName","lastName",email,phone,brand,"licensePlate",color,capacity)
      VALUES (1, 1127639555, 'Andres', 'Montolla', 'andresm@gmail.com', 3224114545, 'Volkswagen Jetta Europa Gl', 'FO4W5I8F8', 'Rojo', 3);
      
      INSERT INTO public."Passenger"("documentTypeId", "documentNumber", "firtName", "lastName", email, phone)
      VALUES (1, 1578698524, 'Ema', 'Urdaneta', 'emau@gmail.com', 3259457825);
      INSERT INTO public."Passenger"("documentTypeId", "documentNumber", "firtName", "lastName", email, phone)
      VALUES (1, 1058635742, 'Aurota', 'Taborda', 'aurorat@gmail.com', 3694582444);
      INSERT INTO public."Passenger"("documentTypeId", "documentNumber", "firtName", "lastName", email, phone)
      VALUES (1, 1089523654, 'Rafael', 'Caldera', 'rafaelc@gmail.com', 3054778585);
      INSERT INTO public."Passenger"("documentTypeId", "documentNumber", "firtName", "lastName", email, phone)
      VALUES (1, 1089474336, 'Javier', 'Perez', 'javierp@gmail.com', 3074582525);`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Travel" DROP CONSTRAINT "FK_3c68ee5b2ff6a09a02b31beb8bf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Travel" DROP CONSTRAINT "FK_e1fcfb353a5050f2b9b516d76f1"`,
    );
    await queryRunner.query(`DROP TABLE "Travel"`);
    await queryRunner.query(`DROP TABLE "Passenger"`);
    await queryRunner.query(`DROP TABLE "Driver"`);
  }
}
