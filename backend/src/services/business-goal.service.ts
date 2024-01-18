// src/services/business-goal.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { BusinessGoal } from '../models/business-goal.model';

@Injectable()
export class BusinessGoalService {
  private businessGoals: BusinessGoal[] = [];

  findAll(): BusinessGoal[] {
    return this.businessGoals;
  }

  findById(id: string): BusinessGoal {
    const goal = this.businessGoals.find(g => g.id === id);
    if (!goal) {
      throw new NotFoundException(`BusinessGoal with ID ${id} not found`);
    }
    return goal;
  }

  create(goal: BusinessGoal): BusinessGoal {
    if (this.businessGoals.some(g => g.id === goal.id)) {
      throw new Error('BusinessGoal with this ID already exists');
    }

    if (this.businessGoals.some(g => g.name === goal.name)) {
      throw new Error('BusinessGoal with this name already exists');
    }

    this.businessGoals.push(goal);
    return goal;
  }

  update(id: string, updatedGoal: BusinessGoal): BusinessGoal {
    const goalIndex = this.businessGoals.findIndex(g => g.id === id);
    if (goalIndex === -1) {
      throw new NotFoundException(`BusinessGoal with ID ${id} not found`);
    }

    // Check if the updated name conflicts with another goal's name
    const duplicateNameIndex = this.businessGoals.findIndex(g => g.name === updatedGoal.name && g.id !== id);
    if (duplicateNameIndex !== -1) {
      throw new Error('Another BusinessGoal with this name already exists');
    }

    this.businessGoals[goalIndex] = updatedGoal;
    return updatedGoal;
  }

  delete(id: string): void {
    const goalIndex = this.businessGoals.findIndex(g => g.id === id);
    if (goalIndex === -1) {
      throw new NotFoundException(`BusinessGoal with ID ${id} not found`);
    }
    this.businessGoals.splice(goalIndex, 1);
  }
}
