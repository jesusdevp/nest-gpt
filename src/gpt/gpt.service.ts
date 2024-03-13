import { Injectable, NotFoundException } from '@nestjs/common';
import * as path from "path";
import * as fs from "fs";
import { orthographyCheckUseCase, prosConsDicusserStreamUseCase, prosConsDicusserUseCase } from './use-cases';
import { OrthographyDto, ProsConsDiscusserDto } from './dtos';
import OpenAI from 'openai';
import { TranslateDto } from './dtos/translate.dto';
import { translateUseCase } from './use-cases/translateUseCase';
import { TextToAudioDto } from './dtos/text-to-audio.dto';
import { textToAudioUseCase } from './use-cases/text-to-audio.use-case';

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

    async trextToAudio({ prompt, voice }: TextToAudioDto) {
        return await textToAudioUseCase(this.openai, {
            prompt,
            voice
        })
    }

    async textToAudioGetter( fileId: string ) {
        const filePath = path.resolve(__dirname, '../../generated/audios', `${ fileId }.mp3`)
        
        const  wasFound = fs.existsSync( filePath )

        if(!wasFound) throw new NotFoundException(`File ${ fileId } not found`)

        return filePath;
    }

}
