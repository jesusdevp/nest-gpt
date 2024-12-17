import OpenAI from "openai";

interface Options {

    threadId: string;
    question: string;

}

export const createMessageUseCase = async ( openai: OpenAI, options: Options ) => {
    
    const { threadId, question } = options;

    try {

        const message = await openai.beta.threads.messages.create( threadId, {
            role: 'user',
            content: question,
        });
    
        return message;
    } catch (error) {
        console.log('Error create at message', error);
        throw error;
    }

}