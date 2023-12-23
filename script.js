const { OpenAI } = require('langchain/llms/openai');
const inquirer = require('inquirer');
require('dotenv').config();

const model = new OpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    temperature: 0,
    model: 'gpt-3.5-turbo'
});

console.log({ model });

const init = async (input) => {

    try {
        const inquireResponse = await inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Ask a general knowledge question about your vehicle:',
            },
        ]); await promptFunc(inquireResponse.name);
    }
    catch (err) {
        console.error(err);
    }

};

init();  