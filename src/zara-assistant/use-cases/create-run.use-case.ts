import OpenAI from "openai";

interface Options {
    threadId : string;
    assistanId?: string;
}

export const createRunUseCase = async ( openai: OpenAI, options: Options ) =>{

    const { threadId, assistanId = 'asst_6B3NYSWN6iZM4qeXjixh7yiL' } = options;

    const run = await openai.beta.threads.runs.create( threadId, {
        assistant_id: assistanId
    });

    return run;

}