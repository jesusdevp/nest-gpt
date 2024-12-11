import { Module } from '@nestjs/common';
import { GptModule } from './gpt/gpt.module';
import { ConfigModule } from '@nestjs/config';
import { ZaraAssistantModule } from './zara-assistant/zara-assistant.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GptModule,
    ZaraAssistantModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
