import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { Project } from './project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project])],  // Import du module TypeORM avec l'entité Project
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
