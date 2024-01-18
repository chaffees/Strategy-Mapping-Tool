// src/models/update-strategy.dto.ts

import { BusinessGoal } from './business-goal.model';

export class UpdateStrategyDto {
    name?: string;
    description?: string;
    goals?: BusinessGoal[];
  }
  