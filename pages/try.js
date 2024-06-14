
import {OpenAI} from "openai";
import {config} from "dotenv";
const OPENAI_API_KEY="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";
const openai = new OpenAI({apiKey:OPENAI_API_KEY});

let prompt = "What is the population of the 3 largest cities in europe?";

const gptResponse = await openai.chat.completions.create({
    model: "gpt-4-1106-preview",
    messages: [
        {"role": "user", "content": prompt},
    ]
})
console.log(gptResponse.choices[0].message.content);