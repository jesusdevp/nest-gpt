import { Body, Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { GptService } from './gpt.service';
import { OrthographyDto, ProsConsDiscusserDto } from './dtos';
import { Response } from 'express';
import { TranslateDto } from './dtos/translate.dto';
import { TextToAudioDto } from './dtos/text-to-audio.dto';

@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}

  @Post('orthography-check')
  orthographyCheck(
    @Body() orthographyDto: OrthographyDto
  ) {
    return this.gptService.orthographyCheck(orthographyDto)
  }

  @Post('pros-cons-discusser')
  prosConsDicusser(
    @Body() prosConsDiscusserDto: ProsConsDiscusserDto
  ) {
    return this.gptService.prosConsDiscusser(prosConsDiscusserDto)
  }

  @Post('pros-cons-discusser-stream')
  async prosConsDicusserStream(
    @Body() prosConsDiscusserDto: ProsConsDiscusserDto,
    @Res() res: Response
  ) {
    const stream = await this.gptService.prosConsDiscusserStream(prosConsDiscusserDto)

    res.setHeader('Content-Type', 'application/json')
    res.status( HttpStatus.OK )

    for await(const chunk of stream) {
      const pieceResponse = chunk.choices[0]?.delta.content || ''

      console.log(pieceResponse)

      res.write(pieceResponse)
    }

    res.end();

  }

  @Post('translate')
  async translateText(
    @Body() translateTextDto: TranslateDto
  ) {
    return this.gptService.tranlate(translateTextDto)
  }

  @Post('text-to-audio')
  async textToAudio(
    @Body() translateTextDto: TextToAudioDto,
    @Res() res: Response
  ) {
    const filePath = await this.gptService.trextToAudio(translateTextDto)

    res.setHeader('Content-Tyoe', 'audio/mp3')
    res.status(HttpStatus.OK)
    res.sendFile(filePath)
  }

  @Get('text-to-audio/:fileId')
  async textToAudioGetter(
    @Res() res: Response,
    @Param('fileId') fileId: string
  ) {
    const filePath = await this.gptService.textToAudioGetter(fileId)

    res.setHeader('Content-Tyoe', 'audio/mp3')
    res.status(HttpStatus.OK)
    res.sendFile(filePath)

    
  }

}
