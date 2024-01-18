// src/services/strategy.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { Strategy } from '../models/strategy.model';
import { BusinessGoal } from '../models/business-goal.model';
import { UpdateStrategyDto } from '../models/update-strategy.dto';

@Injectable()
export class StrategyService {
  private strategies: Strategy[] = [];
  private businessGoals: BusinessGoal[] = []; // Assume a simple array for business goals
  
  findAll(): Strategy[] {
    return this.strategies;
  }

  findById(id: string): Strategy {
    const strategy = this.strategies.find(s => s.id === id);
    if (!strategy) {
      throw new NotFoundException('Strategy not found');
    }
    return strategy;
  }

  create(strategy: Strategy): Strategy {
    if (this.strategies.some(s => s.id === strategy.id)) {
      throw new Error('Strategy with this ID already exists');
    }

    if (this.strategies.some(s => s.name === strategy.name)) {
      throw new Error('Strategy with this name already exists');
    }

    this.strategies.push(strategy);
    return strategy;
  }

  update(id: string, updateStrategyDto: UpdateStrategyDto): Strategy {
    const strategyIndex = this.strategies.findIndex(s => s.id === id);
    if (strategyIndex === -1) {
      throw new NotFoundException('Strategy not found');
    }

    // Check if the updated name conflicts with another strategy's name
    const duplicateNameIndex = this.strategies.findIndex(s => s.name === updateStrategyDto.name && s.id !== id);
    if (duplicateNameIndex !== -1) {
      throw new Error('Another Strategy with this name already exists');
    }

    const updatedStrategy = { ...this.strategies[strategyIndex], ...updateStrategyDto };
    this.strategies[strategyIndex] = updatedStrategy;
    return updatedStrategy;
  }

  delete(id: string): void {
    const strategyIndex = this.strategies.findIndex(s => s.id === id);
    if (strategyIndex === -1) {
      throw new NotFoundException('Strategy not found');
    }
    this.strategies.splice(strategyIndex, 1);
  }

  partialUpdate(id: string, updateStrategyDto: UpdateStrategyDto): Strategy {
    const strategy = this.findById(id);
    if (!strategy) {
      throw new NotFoundException('Strategy not found');
    }

    // Additional check for name duplication on partial update if 'name' field is being updated
    if (updateStrategyDto.name && this.strategies.some(s => s.name === updateStrategyDto.name && s.id !== id)) {
      throw new Error('Another Strategy with this name already exists');
    }

    Object.assign(strategy, updateStrategyDto);
    return strategy;
  }

  associateGoal(strategyId: string, goalId: string): Strategy {
    const strategy = this.findById(strategyId);
    if (!strategy) {
      throw new NotFoundException(`Strategy with ID ${strategyId} not found`);
    }

    const goal = this.businessGoals.find(g => g.id === goalId);
    if (!goal) {
      throw new NotFoundException(`Goal with ID ${goalId} not found`);
    }

    if (!strategy.goals.find(g => g.id === goalId)) {
      strategy.goals.push(goal);
    }
    return strategy;
  }

  disassociateGoal(strategyId: string, goalId: string): Strategy {
    const strategy = this.findById(strategyId);
    if (!strategy) {
      throw new NotFoundException(`Strategy with ID ${strategyId} not found`);
    }

    strategy.goals = strategy.goals.filter(goal => goal.id !== goalId);
    return strategy;
  }
}
