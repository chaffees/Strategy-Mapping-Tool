// src/modules/business-goal.module.ts

import { Module } from '@nestjs/common';
import { BusinessGoalService } from '../services/business-goal.service';
import { BusinessGoalController } from '../controllers/business-goal.controller';

@Module({
  controllers: [BusinessGoalController],
  providers: [BusinessGoalService],
})
export class BusinessGoalModule {}
