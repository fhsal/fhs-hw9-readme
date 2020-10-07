// loading required node packages

const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);
var badge;
var licenseText;

// function to prompt user for readMe content

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
      message: "Enter your GitHub profile url"
    },
    {
      type: "input",
      name: "email",
      message: "Enter your email"
    }
  ])
}

// function to generate content of readMe file using template literals and formatted with markdown tags 

function generateContent(answers) {
  return `

Project Title :  ${answers.title}        ${badge}             
=================================

Table of Contents: 

- [Appliction Description](#description)

- [Installation Instructions](#installation-instructions)

- [Usage](#usage)

- [Licensing](#licensing-type)

- [Contributions](#contributions)

- [Testing](#testing)

- [GitHub-profile](#github-profile)

- [Questions](#questions)


## Description

${answers.description} 

## Installation Instructions

${answers.installation}

## Usage

${answers.usage} 

## Licensing Type

${answers.licensing} - ${licenseText}

## Contributions

${answers.contribution}

## Testing

${answers.testing}

## GitHub profile

GitHub profile [link](${answers.gitHub})

## Questions
I can be reached at ${answers.email}, all inquiries will be handled on a best-effort basis.  We make every effort
to respond within 48 hours. 
`;
}

// calling function to prompt user for inputs and including logic to parse the license type choices to insert into readMe template
// output saved in "sampleReadMe" file 

promptUser()
  .then(function(answers) {
    if (answers.licensing == 'GNU'){
        badge = '[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](http://www.gnu.org/licenses/gpl-3.0)';
        licenseText = 'Permissions of this strong copyleft license are conditioned on making available complete source code of licensed works and modifications, which include larger works using a licensed work, under the same license. Copyright and license notices must be preserved. Contributors provide an express grant of patent rights.'
        ;}
    else if(answers.licensing =='APACHE'){
        badge = '[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)';
        licenseText = 'A permissive license whose main conditions require preservation of copyright and license notices. Contributors provide an express grant of patent rights. Licensed works, modifications, and larger works may be distributed under different terms and without source code.'
        ;}
    else if(answers.licensing =='BSD'){
        badge = '[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)';
        licenseText = 'A permissive license that comes in two variants, the BSD 2-Clause and BSD 3-Clause. Both have very minute differences to the MIT license.'
        ;}
    else if(answers.licensing =='MIT'){
        badge = '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)';
        licenseText = 'A short and simple permissive license with conditions only requiring preservation of copyright and license notices. Licensed works, modifications, and larger works may be distributed under different terms and without source code.'
        ;};

    const text = generateContent(answers);
    return writeFileAsync("sampleReadMe.md", text);
  })
  .then(function() {
    console.log("Successfully wrote to sampleReadMe.md");
  })
  .catch(function(err) {
    console.log(err);
  });
