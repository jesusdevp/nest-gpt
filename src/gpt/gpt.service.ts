import { Injectable, NotFoundException } from '@nestjs/common';
import * as path from "path";
import * as fs from "fs";
import { audioToTextUseCase, imageGenerationUseCase, imageVariationUseCase, orthographyCheckUseCase, prosConsDicusserStreamUseCase, prosConsDicusserUseCase } from './use-cases';
import { ImageGenerationDto, ImageVariationDto, OrthographyDto, ProsConsDiscusserDto } from './dtos';
import OpenAI from 'openai';
import { TranslateDto } from './dtos/translate.dto';
import { translateUseCase } from './use-cases/translateUseCase';
import { TextToAudioDto } from './dtos/text-to-audio.dto';
import { textToAudioUseCase } from './use-cases/text-to-audio.use-case';
import { AudioToTextDto } from './dtos/audio-to-text.dto';

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

    async audioToText(audioFile: Express.Multer.File, audioToTextDto: AudioToTextDto) {

        const { prompt } = audioToTextDto

        return await audioToTextUseCase(this.openai, {
            audioFile,
            prompt,
        })
    }

    async imageGeneration( imageGenerationDto: ImageGenerationDto ) {
        return await imageGenerationUseCase( this.openai, { ...imageGenerationDto } )
    }

    getGeneratedImage( fileName: string ) {

        const filePath = path.resolve('./', './generated/images/', fileName)

        const existFilePath = fs.existsSync( filePath )

        if( !existFilePath ) {
            throw new NotFoundException('File not found')
        }

        return filePath;

    }

    async generateImageVariation( { baseImage }: ImageVariationDto ) {

        return imageVariationUseCase(  this.openai, { baseImage } )

    }

}
