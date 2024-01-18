// src/modules/strategy.module.ts

import { Module } from '@nestjs/common';
import { StrategyService } from '../services/strategy.service';
import { StrategyController } from '../controllers/strategy.controller';

@Module({
  controllers: [StrategyController],
  providers: [StrategyService],
})
export class StrategyModule {}
