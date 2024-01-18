// src/models/strategy.model.ts

import { BusinessGoal } from './business-goal.model';

export class Strategy {
  id: string;
  name: string;
  description: string;
  goals: BusinessGoal[];
}
