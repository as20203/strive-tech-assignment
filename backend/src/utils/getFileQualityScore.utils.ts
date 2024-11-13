import { ChatPromptTemplate } from '@langchain/core/prompts';
import { ChatOpenAI } from "@langchain/openai";
import { StringOutputParser } from "@langchain/core/output_parsers";



// File type detection based on extension
const getFileType = (fileName: string): string => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    switch (ext) {
        case 'js':
            return 'JavaScript';
        case 'py':
            return 'Python';
        case 'java':
            return 'Java';
        case 'html':
        case 'css':
        case 'jsx':
        case 'ts':
            return 'Typescript'
        case 'tsx':
            return 'HTML/CSS/JS';
        case 'cpp':
            return 'C++';
        case 'rb':
            return 'Ruby';
        default:
            return 'Text';  // Default is text if file type is not recognized
    }
}

// Function to generate code quality evaluation using LCEL
export const evaluateCodeQuality = async (code: string, fileType: string) => {
    const model = new ChatOpenAI({
        model: "gpt-4",
        apiKey: process.env.OPENAI_API_KEY
    });
    const systemContent = `
      You are a highly experienced code reviewer. Please assess the following ${fileType} code based on:
      1. Code readability
      2. Maintainability
      3. Complexity
      4. Efficiency
      5. Best practices (e.g., modern ${fileType} practices, variable declarations, etc.)
      
      Provide a score between 1 and 10 for the overall code quality and give suggestions for improvements in each of the above areas.
    `
    // const systemMessage = new SystemMessagePromptTemplate({
    //     content: `
    //   You are a highly experienced code reviewer. Please assess the following ${fileType} code based on:
    //   1. Code readability
    //   2. Maintainability
    //   3. Complexity
    //   4. Efficiency
    //   5. Best practices (e.g., modern ${fileType} practices, variable declarations, etc.)

    //   Provide a score between 1 and 10 for the overall quality and give suggestions for improvements.
    // `,
    // });
    // const humanMessage = new HumanMessagePromptTemplate({
    //     content: `{code}`,
    //     inputVariables: ["code"]
    // }); 
    const promptTemplate = ChatPromptTemplate.fromMessages([
        ["system", systemContent],
        ["user", "{text}"],
    ]);
    const parser = new StringOutputParser();

    const llmChain = promptTemplate.pipe(model).pipe(parser)


    // Evaluate the code using LCEL
    const result = await llmChain.invoke({ text: code });  // No additional input required

    // const text = await parser.invoke(result);


    console.log(result)
    // return result?.text || 'No response';
}