const { OpenAI } = require('langchain/llms/openai');
const inquirer = require('inquirer');
const { PromptTemplate } = require("langchain/prompts");
const { StructuredOutputParser } = require("langchain/output_parsers");
require('dotenv').config();

const model = new OpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    temperature: 0,
    model: 'gpt-3.5-turbo'
});

console.log({ model });

let parser;
let formatInstructions;

const promptFunc = async (input) => {

    try {
        const res = await model.call(input);
        console.log(res);

        parser = StructuredOutputParser.fromNamesAndDescriptions({
            code: "Simple automotive steps that answers the user's question",
            explanation: "detailed explanation of the steps provided",
        });

        formatInstructions = parser.getFormatInstructions();
    }
    catch (err) {
        console.error(err);
    }
};

const init = async () => {
    try {
        const inquireResponse = await inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Ask a general knowledge question about your vehicle:',
            },

            
        ]);

        await promptFunc(inquireResponse.name);

        const prompt = new PromptTemplate({
            template: "You are an automotive expert and will answer the user's questions about their vehicle thoroughly as possible.\n{question}",
            inputVariables: ["question"],
            partialVariables: { format_instructions: formatInstructions }
        });

        const promptInput = await prompt.format({
            question: inquireResponse.name
        });
    }
    catch (err) {
        console.error(err);
    }
};


init();  