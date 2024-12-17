import OpenAI from "openai";



export const createThreadUseCase = async ( openai: OpenAI ) => {

    try {
        
        const { id } = await openai.beta.threads.create();

        return { id };

    } catch (error) {
        console.log('Error create at thread');
        throw error;
    }

}