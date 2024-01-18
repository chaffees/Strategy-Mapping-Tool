// src/controllers/strategy.controller.ts

import { Controller, Get, Post, Body, Param, Delete, Put, Patch, HttpException, HttpStatus } from '@nestjs/common';
import { StrategyService } from '../services/strategy.service';
import { Strategy } from '../models/strategy.model';
import { UpdateStrategyDto } from '../models/update-strategy.dto';

@Controller('strategies')
export class StrategyController {
  constructor(private readonly strategyService: StrategyService) {}

  @Get()
  findAll(): Strategy[] {
    return this.strategyService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Strategy {
    const strategy = this.strategyService.findById(id);
    if (!strategy) {
      throw new HttpException('Strategy not found', HttpStatus.NOT_FOUND);
    }
    return strategy;
  }

  @Post()
  create(@Body() strategy: Strategy): Strategy {
    try {
      return this.strategyService.create(strategy);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatedStrategy: UpdateStrategyDto): Strategy {
    const strategy = this.strategyService.findById(id);
    if (!strategy) {
      throw new HttpException('Strategy not found', HttpStatus.NOT_FOUND);
    }
    return this.strategyService.update(id, updatedStrategy);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    const strategy = this.strategyService.findById(id);
    if (!strategy) {
      throw new HttpException('Strategy not found', HttpStatus.NOT_FOUND);
    }
    this.strategyService.delete(id);
  }

  @Patch(':id')
  partialUpdate(@Param('id') id: string, @Body() updateStrategyDto: UpdateStrategyDto): Strategy {
    const strategy = this.strategyService.findById(id);
    if (!strategy) {
      throw new HttpException('Strategy not found', HttpStatus.NOT_FOUND);
    }
    return this.strategyService.partialUpdate(id, updateStrategyDto);
  }

  // Associate a goal with a strategy
  @Put(':strategyId/goals/:goalId')
  associateGoal(@Param('strategyId') strategyId: string, @Param('goalId') goalId: string): Strategy {
    return this.strategyService.associateGoal(strategyId, goalId);
  }

  // Disassociate a goal from a strategy
  @Delete(':strategyId/goals/:goalId')
  disassociateGoal(@Param('strategyId') strategyId: string, @Param('goalId') goalId: string) {
    return this.strategyService.disassociateGoal(strategyId, goalId);
  }
}
