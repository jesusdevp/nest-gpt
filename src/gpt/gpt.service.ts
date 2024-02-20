import { Injectable } from '@nestjs/common';
import { orthographyCheckUseCase, prosConsDicusserStreamUseCase, prosConsDicusserUseCase } from './use-cases';
import { OrthographyDto, ProsConsDiscusserDto } from './dtos';
import OpenAI from 'openai';
import { TranslateDto } from './dtos/translate.dto';
import { translateUseCase } from './use-cases/translateUseCase';

@Injectable()
export class GptService {

    private openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    })

    async orthographyCheck(orthographyDto: OrthographyDto) {
        return await orthographyCheckUseCase( this.openai, {
            prompt: orthographyDto.prompt
        });
    }
    
    async prosConsDiscusser( { prompt }: ProsConsDiscusserDto ) {
        return await prosConsDicusserUseCase( this.openai, {
            prompt
        })
    }

    async prosConsDiscusserStream( { prompt }: ProsConsDiscusserDto ) {
        return await prosConsDicusserStreamUseCase( this.openai, {
            prompt
        })
    }

    async tranlate({ prompt, lang }: TranslateDto) {
        return await translateUseCase(this.openai, {
            prompt,
            lang
        })
    }

}
