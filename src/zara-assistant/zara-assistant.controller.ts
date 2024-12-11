import { Body, Controller, Post } from '@nestjs/common';
import { ZaraAssistantService } from './zara-assistant.service';
import { QuestionDto } from './dtos/question.dtos';

@Controller('zara-assistant')
export class ZaraAssistantController {
  constructor(private readonly zaraAssistantService: ZaraAssistantService) {}

  @Post('create-thread')
  async createThread() {
    return this.zaraAssistantService.createThread()
  }

  @Post('user-question')
  async userQuestion(
    @Body() questionDto: QuestionDto
  ) {
    return this.zaraAssistantService.userQuestion(questionDto);
  }

}
