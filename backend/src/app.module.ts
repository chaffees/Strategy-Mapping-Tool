// src/app.module.ts

import { Module } from '@nestjs/common';
import { StrategyModule } from './modules/strategy.module';
import { BusinessGoalModule } from './modules/business-goal.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [StrategyModule, BusinessGoalModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
