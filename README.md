# ParseIt

ParseIt eliminates the need of having to write software to extract information, or to perform data science, using large amounts of PDF documents or complex text data. Anyone can create useful parsing operations fast, regardless of technical ability.

Using ParseIt, A non-technical business person can easily upload a large batch of similarly-structured PDF files (e.g. invoices, receipts, HR forms, analysis reports, etc.) or text, and be able to extract information quickly.

[ParseIt Website](https://parse-it-app.herokuapp.com/)

## ParseIt: Overview

ParseIt comes with 21 simple, open-ended modules that can either add, remove, replace, split or save text. The purpose of ParseIt is to "stack" these modules on top of each other, and have your input funneled through each module. The parsing operation starts at the top module and ends at the bottom module. It is up to the user to choose the modules, module sequence and module inputs to form a solution.

As you are manually creating modules, ParseIt automatically generates ParseIt Code - ParseIt's own coding language that represents your sequence of modules in code-form. If you were working from scratch, this code is what you would use to load in all modules you are currently working with.

## Demo

Every module comes with a "preview" to help you visualize how that module will parse your text, before you actually use the module. These visuals speed up the process for the non-technical user, or even for the software developer who wants to extract information quickly.

![demo-fetch](https://raw.githubusercontent.com/MikeM711/ParseIt/master/demo/github-parseit-introduction.gif)

## ParseIt: Examples of Parsing Solutions

[Video: Extract Invoice Information From x14 Invoice PDFs](https://www.youtube.com/watch?v=SY1ERK1HMOo)

[Video: Extract COVID-19 U.S. "Confirmed Cases" Data From x64 World Health Organization PDFs](https://www.youtube.com/watch?v=NJXDQWLnO2E)

[Video: Extract Weather From weather.gov HTML](https://www.youtube.com/watch?v=fVsDxFqaKHk)

## Development

Install backend dependencies: `npm install`

Install frontend dependencies: `cd client` `npm install`

Concurrently run both backend and frontend servers (root directory): `npm run start-dev`

Run jest tests inside client: `npm run test`

