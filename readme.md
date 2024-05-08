# Waqqly: Dog Walker Management System 🐕

## Overview:
This repository contains code for a Node.js application designed to manage dog walker information. The application interacts with an Azure SQL Database to insert new walker details into the database. This README provides information on how to set up and use the application.

The code was developed in Visual Studio Code, the details below are related to the VSC application. 

The website is hosted as an Azure Static Web App https://waqqlywebsite.z33.web.core.windows.net/


## Installation

1. Clone the repository to your local machine:.

```bash
git clone https://github.com/winchstudent/waqqly24Mar.git
```

2. Install dependencies

```bash
npm install mssql
```

3. As this is a Node.js application, it requires the installation of Node.js itself. Please install via the nodejs website https://nodejs.org/en/download

4. Ensure that you have an Azure SQL Database set up with the appropriate credentials. Update the sqlConfig object in index.js with your Azure SQL Database credentials.

## Deployment

The solution comprises three components: 

1. an external webpage
2. two Azure Functions (1) HttpExample: the original dog walker function (2) HttpTriggerOwner: the dog owner function
3. an Azure SQL Database

These components are deployed across three Azure services. The HTML webpage is hosted on Azure Storage, the database is provisioned and deployed on Azure SQL Database, and the function responsible for transferring data from the website to the database is deployed as an Azure Function.

## Usage

1. To insert a new walker into the database, send a POST request with the following parameters:

- walkername: Name of the walker
- walkeremail: Email of the walker
- walkerlocation: Location of the walker

2. If successful, you will receive a response ("Walker Inserted") indicating that the walker has been inserted.

Code Structure:

- index.js: Main entry point of the application containing the Azure Function code
- sqlConfig: Configuration object for connecting to the Azure SQL Database
- insertWalker: Function to insert a new walker into the database
- context and req: Parameters passed to the Azure Function representing the execution context and HTTP request

## Testing:
To test whether the function is working, when running the function in VSC, use the string below as the input:

```javascript
walkername=NameTest&walkeremail=EmailTest%40Email.com&walkerlocation=LocationTest
```
The function will take the input and isolate the values for name, email, and location
- walkername=NameTest
- walkeremail=EmailTest@Email.com
- walkerlocation=LocationTest

Verify the values have been received in the Azure SQL Database. 

## Dependencies:

- mssql: Module for connecting to Microsoft SQL Server from Node.js

## Website: 

The website details can be found here https://github.com/winchstudent/waqqly24Mar/tree/main/website
This included the graphics

## Contributing:
Contributions to this project are welcome. If you find any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.

## License

[MIT](https://choosealicense.com/licenses/mit/)
