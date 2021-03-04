# Prototype URL
```
http://emotionalstoryteller.herokuapp.com/
```

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

### Using ngrok

Download the zip file from the website and add your authtoken to your ngrok.yml file.
Then go to file location in command prompt and run

```
ngrok http 3000
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

### Intent Table Schema

intent_id, intent, suggestions, image_url, joy, sadness, fear, anger, disgust

### Story Table Schema

story_name, event_name, emotion

### Conslusion Table Schema

conclusion_name, event_name, section_name

### Session Table Schema

session_id, user_responses, sections, conclusion_no
```

Run migrations and seeds in the terminal

```
npx knex migrate:latest
npx knex seed:run
```