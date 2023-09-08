import { Module } from '@nestjs/common';
import { ProjectsService } from './services/projects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsEntity } from './entities/projects.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectsEntity])],
  providers: [ProjectsService],
})
export class ProjectsModule {}
