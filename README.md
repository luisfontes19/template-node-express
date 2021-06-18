# Node Server

## Database

You can set up databases per environment. Just create a new file under /db with the name of the environment to be used. Check /db/development.ts for how to structure the file. configs from /db/global.ts will be applied to all, you can override them.

Although typeorm is used with active directory, you should extend our MainEntity instead of BaseEntity. This will provide a mechanism to validate errors on save, and only save of no errors. You can disable this by changing the variable applyValidations of the model.

## Controllers

All controllers should extend BaseController
The application provides has built in mechanisms that will instantiate and call the required method of the controller.
BaseController has a method beforeAction that will always be called, before calling the actual endpoint handler. This method returns true or false, which indicates if the server should continue to the handler or not. You can use instead of middlewares, when you need more complex logic on either it should run or not.
This method can also be overriden in extended controllers. Remember to always return true or false. 

## Env files

env files should have the name of the running environment like '.production.env' or .development.env' and will be automatically loaded into the server. If you use static variables from classes they will probably be processed before env variables are loaded, so you'll get empty values. Use a initializer method instead

## Middlewares

* Auth middleware, uses google single sign on (can have others) and ends up with JWT strategy, to send a jwt to the user in a cookie, no session needed. If you need to add more strategies (keep the jwt, its good) look on how google strategy integrates with the rest of the flow
* csrf middleware - creates a token sends it in a cookie with a secret. Its expected that the frontend sends the token in a header, and the secret can come automatically in the cookie. (The token in the cookie is ignored)
* Error handling
* Request loging

## Scripts

npm run migration create Test
npm run migration run
npm run migration revert
npm run migration generate