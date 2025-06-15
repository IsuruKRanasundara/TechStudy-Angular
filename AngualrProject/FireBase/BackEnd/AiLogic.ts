
import { model,AI } from "./FireBaseConfig";
//Initialize the prompt
function extractText(result: any): string {
  return result?.response?.candidates?.[0]?.content?.parts?.[0]?.text || '';
}
export async function generateResponse(searchQuery: string): Promise<string> {
    if (!model) {
        throw new Error("Model is not initialized");
    }
        
    // Use the model to generate a response
    const result = await model.generateContent("Think You are a Lecturer about IT content . Then,can you put the brief description about module which is " + searchQuery);
    // Assuming the result has a 'text' property containing the string response
    
    const text = extractText(result);
    if (!text) {
        throw new Error("Invalid response from model");
    }
    console.log("Generated response:", text);
    return text;
}

