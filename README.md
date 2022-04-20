# Rest Api

NodeJs Rest Api Scaffold.

## Start Development Server

### Very important you must have nodemon package installed!

NPM: ```npm run dev```

YARN: ```yarn dev```

## Start Node

NPM: ```npm start```

YARN: ```yarn start```

## Heroku

### Check environment variables in console

```heroku config```

### Set a new environment variable
```heroku config:set test="lorem ipsum"```

### Unset a new environment variable

```heroku config:unset test```

### Deploy to heroku

```git push heroku master```

### Heroku logs

```heroku logs -n 100 --tail```

## MongoDB

### Start Server

Mac ```brew services start mongodb-community```

### Stop Server

Mac ```brew services stop mongodb-community```

### Restart Server

Mac ```brew services restart mongodb-community```