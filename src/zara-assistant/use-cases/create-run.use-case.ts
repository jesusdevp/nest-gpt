import OpenAI from "openai";

interface Options {
    threadId : string;
    assistantId?: string;
}

export const createRunUseCase = async ( openai: OpenAI, options: Options ) =>{

    const { threadId, assistantId = 'asst_6B3NYSWN6iZM4qeXjixh7yiL' } = options;

    try {
        const run = await openai.beta.threads.runs.create(threadId, {
            assistant_id: assistantId,
            
        });

        return run;
    } catch (error) {
        console.error('Error while creating run:', error);
        throw error;
    }

}