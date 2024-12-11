import { Module } from '@nestjs/common';
import { ZaraAssistantService } from './zara-assistant.service';
import { ZaraAssistantController } from './zara-assistant.controller';

@Module({
  controllers: [ZaraAssistantController],
  providers: [ZaraAssistantService],
})
export class ZaraAssistantModule {}
