# frontend

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

# Backend

## Project Setup

### NodeJS 

Make sure you have NodeJS installed

### Install packages

In the terminal, go in the "backend" folder and run

```
npm install
```
### Run the project

You have to be in the /emotionalstoryteller/backend folder, and you have to run 

```
npm run serve
```
### Database connection

You have to install the PostgreSQL database on your local machine, and you have to create a new database called "storyteller". 
Then you have to create a file in the "backend" folder named ".env" in which you have to write the following things:

```
#DATABSE CONFIG

DEV_DB_NAME="storyteller" #THIS IS THE NAME OF THE DB, you should set it like this so that we will have the same one
DEV_DB_USR="postgres"
DEV_DB_HOST="localhost"
DEV_DB_PWD="YOURPASSWORD_THAT_YOU_SET_WHEN_YOU_INSTALLED_POSTGRES"
DEV_DB_PORT=5432