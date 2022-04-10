# CRUD Todo app with NextJS, TypeScript, Cypress, ESLint and ChakraUI with json-server

## Introduction

> A simple TODO app for POC (Proof of concept) of basic CRUD(Create Read Update and Delete) operations with a type checked TDD (Test Driven Development) approach.

## Tools and technologies

Below are the main tools and technologies used in this project:

- [NextJS](https://nextjs.org)
- [ReactJS](https://reactjs.org)
- [Cypress](https://cypress.io)
- [ChakraUI](https://chakra-ui.com)
- [ESLint](https://eslint.org)
- [TypeScript](https://typescriptlang.org)
- [Formik](https://formik.org)
- [Axios](https://axios-http.org)
- [json-server](https://www.npmjs.com/package/json-server)

## Features

- Create a task
- Get a task
- Get all tasks
- Update a task
- Delete a task
- Integration/E2E (End to End) testing suites for the above functionality

## Core Principles

Below are some principles this project helps to showcase:

- CRUD (Create, Read, Update and Delete)
- TDD (Test Driven Development)
- ES6+ (EcmaScript 2015+)
- React hooks

## Getting Started

### Notes

> Before proceeding to the next section, kindly ensure that your terminal window is on the right directory, you can use the below helper commands to check/confirm:

- `cd` command to change directory e.g. `cd path/to/project`
- `pwd` command to check your "print working directory"
- `ls` command to show the content of your current directory

> Please note: The JSON server and (development server + testing environment) are to be executed seprarately by opening different terminal windows or tabs.
> The project and have been configured to run on certain ports by default, feel free to modify the ports or use the `--port` flag where necessary to change them if you already have another application running on the same port.
> <br />

> The `json-server` runs on `http://localhost:3001` and `nextjs` server runs on `http://localhost:3000` by default

### Commands

```bash
# Install dependencies
npm install

# Run json-server only
npm run start-json-server

# Run nextjs development server and cypress testing environment concurrently
npm run develop

# Other commands can be found on the package.json file in the root directory
```

## Author

> ### Precious OSSAI

- [LinkedIn](https://www.linkedin.com/in/ossaiprecious)
- [Website](https://www.ossaiprecious.com)
- [GitHub](https://www.github.com/PeCrio)
- [Dribbble](https://www.dribbble.com/PeCrio)
- [Email](mailto:theossaiprecious@gmail.com)
