# Library
This app was created using `ng new` and `dotnet new webapi --use-controllers` in VSCode. App uses dotnet 10 and Angular 22.

## Setup Instructions
1. Run `npm install` in NgLibrary directory to install dependencies for Angular.
1. Add the `ConnectionStrings:DefaultConnection` in LibraryAPI/appsettings.json or app secrets.
1. `dotnet restore` and `dotnet build` in LibraryAPI to install dotnet dependencies and build the project.

## Running the Project
1. Frontend: Open a terminal and run `npm start` on the NgLibrary project.
1. Backend: Using VSCode, click "Run" -> "Start Debugging" or press F5 to start the dotnet project.