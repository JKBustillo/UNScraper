# UNScraper

A program that extracts the names, professors and NRC of the undergraduate subjects from Universidad del Norte's page.

## Project Setup

    npm install
    

## Run Scraper

    node src/index
 or
 

    npm start

## Outputs
The program's outputs are .txt files created in the "outputs" folder in the root directory. Every file contains info in the following structure:

> "Department name", "Subject", "Professor", "NRC"

Every .txt file contains a different department with every subject with its respective professor and NRC.

## Check List

 - [x] Subjects
 - [x] Professor
 - [x] Department
 - [x] NRC
 - [x] Outputs .txt
 - [ ] Fix broken words
