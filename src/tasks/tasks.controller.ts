import { Controller, Get, Post, Body, Param, Delete, Patch, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskFilterDto } from './dto/task-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor (private tasksService:TasksService) {}

  @Get()
  getTasks(@Query() taskfilterDto: TaskFilterDto): Task[]{

    if (Object.keys(taskfilterDto).length)
    {
      return this.tasksService.getTasksWithFilter(taskfilterDto);
      
    }
    else
    {
      return this.tasksService.getAllTasks();
    }

  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task{
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(
   @Body() createTaskDto: CreateTaskDto
  ): Task{
    return this.tasksService.createTask(createTaskDto);

  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): void{
     this.tasksService.deleteTask(id);

  }

  @Patch('/:id')
  updateTaskStatus (@Param('id') id: string, @Body('status') status: TaskStatus): Task{
    return this.tasksService.updateTaskStatus(id,status);
  }
   
}
