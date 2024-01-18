import OpenAI from "openai";

interface Options {
    prompt: string;

}

export const orthographyCheckUseCase = async(openai: OpenAI , options: Options) => {

    const { prompt } = options

    const completion = await openai.chat.completions.create({
        messages: [
            { 
                role: "system", 
                content: `
                    Recibiras textos en espanol con posibles errores ortograficos y gramaticales,
                    Las palabras deben existir en el diccionario de la real academia Española
                    Debes responder en formatos JSON
                    tu tarea es corregirlos y retornar informacion soluciones


                    Si no hay errores, debes un mensaje de felicitaciones, 
                    asi como un mensaje de superacion personal

                    Ejemplo de salida:
                    {
                        userScore: number,
                        errors: string[], // ['error -> solucion']
                        message: string, // Usa emojis y texto para felicitar al usuario
                    }
                `
            },
            {
                role: 'user',
                content: prompt
            }
        ],
        model: "gpt-3.5-turbo-1106",
        temperature: 0.2,
        max_tokens: 150,
        response_format: {
            type: 'json_object'
        }
      });

      const respJson = JSON.parse(completion.choices[0].message.content)
    
      return respJson;

}