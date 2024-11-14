import { ChatPromptTemplate } from '@langchain/core/prompts';
import { ChatOpenAI } from "@langchain/openai";
import { StringOutputParser } from "@langchain/core/output_parsers";


// Function to generate code quality evaluation using LCEL
export const evaluateCodeQuality = async (code: string) => {
    const model = new ChatOpenAI({
        model: "gpt-4",
        apiKey: process.env.OPENAI_API_KEY
    });
    const systemContent = `
      You are a highly experienced code reviewer. Understand the programming language based on the content. Then Please assess the following  code based on:
      1. Code readability
      2. Maintainability
      3. Complexity
      4. Efficiency
      5. Best practices (e.g., modern  practices, variable declarations, etc.)
      
      Provide a score between 1 and 10 for the overall code quality and give suggestions for improvements in each of the above areas.
    `

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