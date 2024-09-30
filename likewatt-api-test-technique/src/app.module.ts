import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsModule } from './projects/projects.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Project } from './projects/project.entity';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }), // Load .env variables
        TypeOrmModule.forRoot({ // Configuration de la connexion à la base de données
            type: process.env.DB_TYPE as 'mysql',
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT, // Conversion du port en nombre
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            autoLoadEntities: true,
            synchronize: true,
        }),
        TypeOrmModule.forFeature([Project]), // Enregistre l'entité Project pour l'injection dans les services
        ProjectsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
