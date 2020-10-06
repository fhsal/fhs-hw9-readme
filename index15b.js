const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);
var badge;

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
      type: "input",
      name: "description",
      message: "please provide a description of your application",
    },
    {
      type: "input",
      name: "usage",
      message: "enter usage information for your app"
    }, 
    {
      type: "input",
      name: "contribution",
      message: "enter information regarding contributors to your app"
    }, 
    {
      type: "list",
      name: "licensing",
      message: "what type of licencing for this package?",
      choices: ['GNU', 'APACHE', 'BSD', 'MIT']
    },   
    {
      type: "input",
      name: "installation",
      message: "enter the installation instructions for your app"
    }, 
    {
      type: "input",
      name: "testing",
      message: "how is testing to be performed for the application?",
    },
    {
      type: "input",
      name: "gitHub",
      message: "What is your GitHub profile?"
    },
    {
      type: "input",
      name: "email",
      message: "Enter your email"
    }
  ])
}



function generateContent(answers) {
  return `

Project Title :  ${answers.title}        ${badge}             
=================================

Table of Contents: 

- [Appliction Description](#description)

- [Installation Instructions](#installation-instuctions)

- [Usage](#usage)

- [Licensing](#licensing-type)

- [Contributions](#contribution)

- [Testing](#testing)

- [GitHub-profile](#username)

- [Questions](#email)


##Description
${answers.description} 

##Installation Instructions  
${answers.installation}

##Usage
${answers.usage} 

##Licensing Type:  
${answers.licensing}

##Contributions:  
${answers.contribution}

##Licensing Type:  
${answers.licensing}

##GitHub profile:  
${answers.gitHub}

##Questions
I can be reached at ${answers.email}, all inquiries will be handled on a best-effort basis.  We make every effort
to respond within 48 hours. 
`;
}

promptUser()
  .then(function(answers) {
    if (answers.licensing == 'GNU'){
        badge = '[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](http://www.gnu.org/licenses/gpl-3.0)';
        ;}
    else if(answers.licensing =='APACHE'){
        badge = '[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)';
        ;}
    else if(answers.licensing =='BSD'){
        badge = '[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)';
        ;}
    else if(answers.licensing =='MIT'){
        badge = '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)';
        ;};

    const text = generateContent(answers);
    return writeFileAsync("testFile.md", text);
  })
  .then(function() {
    console.log("Successfully wrote to testFile.txt");
  })
  .catch(function(err) {
    console.log(err);
  });
