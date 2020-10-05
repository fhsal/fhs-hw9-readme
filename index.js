
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);


// // function to prompt user for ReadMe information 

// function promptUser() {
    inquirer.prompt([
      {
        type: "input",
        name: "title",
        message: "What is the Title of your project?"
      },
      // {
      //   type: "input",
      //   name: "toc",
      //   message: "what are the items in your table of contents?"
      // },
      // {
      //   type: "input",
      //   name: "installation",
      //   message: "what are the installation instructions?"
      // },
      // {
      //   type: "input",
      //   name: "usage",
      //   message: "what usage notes should be provided?"
      // },
      {
        type: "list",
        name: "licensing",
        message: "what type of licencing for this package?",
        choices: ['unlimited', 'minor restricted', 'single use']
      },
      // {
      //   type: "input",
      //   name: "contributing",
      //   message: "what are the contribution guidelines?"
      // },
      // {
      //   type: "input",
      //   name: "tests",
      //   message: "what information should be provided regarding testing?"
      // },
      {
        type: "input",
        name: "userName",
        message: "What is your GitHub username?"
      },
      // {
      //   type: "input",
      //   name: "email",
      //   message: "what is your email address?"
      // },
    ])
    .then(function(data) {

      var filename = data.name.toLowerCase().split(' ').join('') + ".json";
    
      fs.writeFile(testFile, JSON.stringify(data, null, '\t'), function(err) {
    
        if (err) {
          return console.log(err);
        }
    
        console.log("Success!");
    
      });
    });


  // .then (console.log(answer.questions));
  // };

  // function writeReadme(answers) {
  //   return 
  //    answers.title + ' +++' + answers.choices
  //   }

// promptUser()
// .then(function(answers) {
//    const output = writeReadme(answers) 
//   return output
//   console.log(output)
// })

// // array of questions for user
// const questions = [

// ];

// // function to write README file
// function writeToFile(fileName, data) {
// }





// // function to initialize program
// function init() {

// }

// // function call to initialize program
// init();
