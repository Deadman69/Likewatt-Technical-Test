import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException, BadRequestException } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) {}

    /**
     * Check if a project exists with a specific ID, return it if found. Otherwise, return a NotFoundException.
     * @param id ID of the Project to search
     * @returns Project object or a NotFoundException if Project with the specified ID is not found.
     * @emits NotFoundException
     */
    private async checkProjectExists(id: string) {
        const project = await this.projectsService.findOne(+id);
        
        if (!project) {
            throw new NotFoundException(`Project with ID ${id} doesn't exist.`);
        }

        return project;
    }

    @Post()
    async create(@Body() createProjectDto: CreateProjectDto) {
        // Check if some fields are missing
        if (!createProjectDto.name || !createProjectDto.address) {
            throw new BadRequestException(`Fields 'name' and 'address' are mandatory.`);
        }
        
        return await this.projectsService.create(createProjectDto);
    }

    @Get()
    async findAll() {
        return await this.projectsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const project = await this.checkProjectExists(id);
        
        return project;
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
        // We don't need to use "Project" object here, just check if the Project exists
        await this.checkProjectExists(id);
        
        return await this.projectsService.update(+id, updateProjectDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        // We don't need to use "Project" object here, just check if the Project exists
        await this.checkProjectExists(id);
        
        // Delete the Project
        await this.projectsService.remove(+id);
        
        // Send back a confirmation message as "service.remove" method doesn't return a confirmation message like for "service.update".
        return { message: `Project deleted` };
    }
}
