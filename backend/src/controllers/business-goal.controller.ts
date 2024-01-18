// src/controllers/business-goal.controller.ts

import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { BusinessGoalService } from '../services/business-goal.service';
import { BusinessGoal } from '../models/business-goal.model';

@Controller('business-goals')
export class BusinessGoalController {
  constructor(private readonly businessGoalService: BusinessGoalService) {}

  @Get()
  findAll(): BusinessGoal[] {
    return this.businessGoalService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): BusinessGoal {
    return this.businessGoalService.findById(id);
  }

  @Post()
  create(@Body() goal: BusinessGoal): BusinessGoal {
    return this.businessGoalService.create(goal);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatedGoal: BusinessGoal): BusinessGoal {
    return this.businessGoalService.update(id, updatedGoal);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    this.businessGoalService.delete(id);
  }
}
