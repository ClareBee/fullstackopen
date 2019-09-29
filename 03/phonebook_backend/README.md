
https://abracadabrant-vin-37062.herokuapp.com

Frontend - production build via `npm run build`
`cp -r build ../../../03/phonebook_backend`
and add to package.json
`  "proxy": "http://localhost:3001"`

### Backend
- Add cors package
- Procfile for Heroku `web: node index.js`
`git push heroku master`
- Serve up frontend folder
`app.use(express.static('build'))`
or streamlined via scripts:

```json
{
  "deploy": "git push heroku master",
  "logs:prod": "heroku logs --tail",
  "build:ui": "rm -rf build && cd ../../02/phonebook && npm run build --prod && cp -r build ../../03/phonebook_backend/",
  "deploy:full": "npm run build:ui && git add . && git commit -m uibuild && npm run deploy",
}
```
- Deploying db to production:
`heroku config:set MONGODB_URI=mongodb+srv://clarebee:{password}@cluster0-qugsl.mongodb.net/people?retryWrites=true`

`node_modules/.bin/eslint --init`
