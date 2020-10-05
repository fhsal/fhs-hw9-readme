const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your name?"
    },
    {
      type: "input",
      name: "title",
      message: "What is the Title of your project?"
    },
    {
      type: "list",
      name: "licensing",
      message: "what type of licencing for this package?",
      choices: ['GNU', 'APACHE', 'BSD', 'MIT']
    },
    {
      type: "input",
      name: "userName",
      message: "What is your GitHub username?"
    },
    {
      type: "input",
      name: "toc",
      message: "what are the items in your table of contents?"
    },
      
    // {
    //   type: "input",
    //   name: "github",
    //   message: "Enter your GitHub Username"
    // },
    {
      type: "input",
      name: "email",
      message: "Enter your email."
    }
  ]);
}

var badge
var licenceChoice

function getLicense (answers){

  if(answers.license == 'GNU'){ 
    
  badge = '[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](http://www.gnu.org/licenses/gpl-3.0)';
    }
  else if(answers.license =='APACHE'){
    badge = '[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)';
  }
  else if(answers.license =='BSD'){
    badge = '[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)';
  }
  else if(answers.license =='MIT'){
    badge = '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)';
  }

  console.log(badge)
  };


function generateContent(answers) {
  return `

Project Title :  ${answers.title}                     

Table of Contents:   

    [Installation Instructions](#installation-instuctions)
    [Usage](#usage)
    [Licensing](#licensing-information)
    [Contribution Guidelines](#contribution-guidelines)
    [Testing](#testing)
    [GitHub repository](#username)
    [Questions](#email)

Installation Instructions:  ${answers.installation}

Usage:  ${answers.usage} 

Licensing Information:  ${answers.licensing}

GitHub repository:  ${answers.userName}

Questions: I can be reached at ${answers.email}, all inquiries will be handled on a best-effort basis.  We make every effort
to respond within 48 hours. 
`;
}

promptUser()
  .then(function(answers) {
    const text = generateContent(answers);

    return writeFileAsync("testFile.md", text);
  })
  .then(function() {
    console.log("Successfully wrote to testFile.txt");
  })
  .catch(function(err) {
    console.log(err);
  });
