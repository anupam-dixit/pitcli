import chalk from "chalk";
import inquirer from "inquirer";
import ora from "ora";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export const mvcGenerator = () => {
  inquirer
      .prompt([
          {
              type: "input",
              name: "title",
              message: "Target Title ",
          },
          {
              type: "input",
              name: "format",
              message: "Give me the format!",
          },
      ])
    .then((answers) => {
        const spinner = ora(answers?.title).start();
        if (answers.format.includes('co')){
            var ControllerTemplate=fs.readFileSync(path.join(__dirname,'../templates/controller.txt') , { encoding: 'utf8', flag: 'r' });
            let readyController= ControllerTemplate.replaceAll("_Target",answers?.title)
            fs.writeFileSync("app/controllers/"+answers?.title+"Controller.js", readyController);
            spinner.info(chalk.blue("Controller"));
        }
        if (answers.format.includes('mo')){
            var modelTemplate=fs.readFileSync(path.join(__dirname,'../templates/model.txt') , { encoding: 'utf8', flag: 'r' });
            let readyModel= modelTemplate.replaceAll("_Target",answers?.title)
            fs.writeFileSync("app/models/"+answers?.title+"Model.js", readyModel);
            spinner.info(chalk.blue("Model"));
        }
        if (answers.format.includes('va')){
            var ValidationTemplate=fs.readFileSync(path.join(__dirname,'../templates/validation.txt') , { encoding: 'utf8', flag: 'r' });
            let readyValidation= ValidationTemplate.replaceAll("_Target",answers?.title)
            fs.writeFileSync("app/validations/"+answers?.title+"Validation.js", readyValidation);
            spinner.info(chalk.blue("Validation"));
        }
    })

};
