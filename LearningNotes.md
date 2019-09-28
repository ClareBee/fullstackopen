## Learning Notes

- [ExpressJS Backend](#expressjs-backend)
  * [Node and ExpressJS](#node-and-expressjs)
  * [REST](#rest)
  * [MongoDB and Mongoose](#mongodb-and-mongoose)
  * [Deployment](#deployment)
  * [Jest & Supertest](#jest)
- [React Frontend](#react-frontend)
  * [React Hooks](#react-hooks)
  * [React Router](#react-router)
  * [Redux](#redux)
  * [React Testing Library](#react-testing)
  * [Cypress](#cypress)
- [Dev Links](#dev-links)
  * [Axios](#axios)
  * [JsonServer](#jsonserver)
  * [LocalStorage](#localstorage)
  * [Linting](#linting)
  * [Webpack](#webpack)
  * [MaterialUI](#materialui)
  * [SemanticUI](#semanticui)


## Express.js Backend

**Node.js & Express.js**
- Node's built-in webserver:

```javascript
const http = require('http')

const app = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('Hello World')
})

const port = 3001
app.listen(port)
console.log(`Server running on port ${port}`)
```
- Add ExpressJS . 
https://expressjs.com/

`npm install express --save`

```javascript
const express = require('express')
const app = express()
```

- Automatic restart with nodemon . 
https://nodemon.io/

`npm install --save-dev nodemon`

- Add script:  
```json
"start": "node index.js",
"watch": "nodemon index.js",
```

`npm run watch`

- Middleware . 
E.g. https://github.com/expressjs/morgan for logging . 

Add body-parser . 
`npm install body-parser`

>takes the JSON data of a request, transforms it into a JavaScript object and then attaches it to the body property of the request object before the route handler is called.

```javascript
const bodyParser = require('body-parser')
app.use(bodyParser.json())
```

**REST** . 
https://restfulapi.net/

**MongoDB & mongoose** . 
- https://docs.mongodb.com/
- https://mongoosejs.com/

**Deployment** . 
TBC

**Jest & Supertest** . 
`npm install --save-dev jest`
`npm install --save-dev supertest`

In `.test.js` file: 
`const api = supertest(app)`

Add to package.json:
```
"test": "NODE_ENV=test jest --verbose --runInBand",
"jest": {
  "testEnvironment": "node"
}
```
Run individual test:    
`jest -t name-of-spec`
https://jestjs.io/docs/en/cli . 

Add to ESLint config:  
```
module.exports = {
  "env": {
    "commonjs": true
    "es6": true,
    "node": true,
    "jest": true,
  },
  "extends": "eslint:recommended",
  "rules": {
    // ...
  },
};
```
Windows compatibility:  
`npm install --save-dev cross-env`
```
"scripts": {
  "start": "cross-env NODE_ENV=production node index.js",
  "watch": "cross-env NODE_ENV=development nodemon index.js",
  // ...
  "test": "cross-env NODE_ENV=test jest --verbose --runInBand",
},
```

```javascript
require('dotenv').config()

let PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI

if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.TEST_MONGODB_URI
}

module.exports = {
  MONGODB_URI,
  PORT
}
`npm install --save-dev supertest`
`npm install -g jest`
`npx jest tests/note_api.test.js --runInBand`
`npx jest -t` 'a specific note is within the returned notes'
```

>The test imports the Express application from the app.js module and wraps it with the supertest function into a so-called superagent object. This object is assigned to the api variable and tests can use it for making HTTP requests to the backend.
https://fullstackopen.com/en/part4/testing_the_backend


## React Frontend . 

**Refs** . 
https://reactjs.org/docs/refs-and-the-dom.html

**useState Hook** . 
- at top level of component
```jsx
const [plan, setPlan] = useState({content: ""});
```

**useEffect Hook** . 
- for side effects in function components. e.g. Data fetching, setting up a subscription, & manually changing DOM

**PropTypes** . 
`npm install --save prop-types`

```jsx
LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired
}
```

**JsonServer** . 

`npm install json-server --save`
```
"scripts": {
  "server": "json-server -p3001 db.json",
  // ...
}
```
`npm run server`


**Redux** . 
`npm install redux --save`

Immutability:  
`npm install --save-dev deep-freeze`

```jsx
import noteReducer from './noteReducer'
import deepFreeze from 'deep-freeze'

describe('noteReducer', () => {
  test('returns new state with action NEW_NOTE', () => {
    const state = []
    const action = {
      type: 'NEW_NOTE',
      data: {
        content: 'the app state is in redux store',
        important: true,
        id: 1
      }
    }

    deepFreeze(state)
    const newState = noteReducer(state, action)

    expect(newState.length).toBe(1)
    expect(newState).toContainEqual(action.data)
  })
})
```

**CombineReducers & Middleware:** . 

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import App from './App'
import noteReducer from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'

const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer
})

const store = createStore(reducer)

ReactDOM.render(
  <App store={store} />,
  document.getElementById('root')
)
```
Redux Thunk for async actions:   
https://github.com/reduxjs/redux-thunk . 

`npm install redux-thunk`

```javascript
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';

const store = createStore(rootReducer, applyMiddleware(thunk));
```

**React Router**  
`npm install --save react-router-dom`

```javascript
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'

const App = () => {
  const noteById = (id) =>
    notes.find(note => note.id === Number(id))

  return (
    <div>
      <Router>
        <div>
          <div>
            <Link to="/">home</Link>
            <Link to="/notes">notes</Link>
          </div>

          <Route exact path="/" render={() => <Home />} />
          <Route exact path="/notes" render={() =>
            <Notes notes={notes} />
          } />
          <Route exact path="/notes/:id" render={({ match }) =>
            <Note note={noteById(match.params.id)} />
          } />
        </div>
      </div>
    </Router>
  </div>
  )
}
```

---
https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/withRouter.md

>BrowserRouter is a Router that uses the HTML5 history API (pushState, replaceState and the popState event) to keep your UI in sync with the URL.


**ReactTestingLibrary** . 
https://testing-library.com/docs/react-testing-library/api#debug

`npm install --save-dev @testing-library/react @testing-library/jest-dom`

```javascript
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import Note from './Note'

afterEach(cleanup)

test('renders content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  const component = render(
    <Note note={note} />
  )

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
})
component.debug()
```

```javascript
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Note from './Note'

test('renders content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  const component = render(
    <Note note={note} />
  )
  const li = component.container.querySelector('li')

  console.log(prettyDOM(li))
})
```

### Cypress . 

`npm install --save-dev cypress`

- Add to `package.json` script block: `"cypress:open": "cypress open"`
- To run headlessly: `"cypress:run": "cypress run"`
- To backend `package.json` script block: `"start:test": "cross-env NODE_ENV=test node index.js"`

Run FE & BE:  
`npm run cypress:open`

Testing controller for managing db state:  
```javascript
// App.js
if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}
```

Example testing controller:  

```javascript
const router = require('express').Router()
const User = require('../models/user')

router.post('/reset', async (request, response) => {
  await User.deleteMany({})

  response.status(204).end()
})

module.exports = router
```
beforeEach() in FE tests, reset db:
```javascript
beforeEach(function() {
  cy.request('POST', 'http://localhost:3001/api/testing/reset')
  const user = {
    name: 'test',
    username: 'test',
    password: 'test'
  }
  cy.request('POST', 'http://localhost:3001/api/users/', user)
  cy.visit('http://localhost:3000')
})
```

## Dev Links . 

**axios** . 
https://github.com/axios/axios
`npm install axios`
E.g. from docs:
```javascript
const axios = require('axios');

// Make a request for a user with a given ID
axios.get('/user?ID=12345')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
```

**localStorage for JWT** . 
```javascript
useEffect(() => {
  const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    setUser(user)
    noteService.setToken(user.token)
  }
}, [])
window.localStorage.removeItem('loggedNoteappUser')

window.localStorage.clear()
```

**ESLint** . 
`npm install eslint --save-dev`
`node_modules/.bin/eslint --init`

With Jest:
`npm add --save-dev eslint-plugin-jest`

```javascript
//.eslintrc.js
module.exports = {
  "env": {
      "browser": true,
      "es6": true,
      "jest/globals": true
  },
  "extends": [
      "eslint:recommended",
      "plugin:react/recommended"
  ],
  "parserOptions": {
      "ecmaFeatures": {
          "jsx": true
      },
      "ecmaVersion": 2018,
      "sourceType": "module"
  },
  "plugins": [
      "react", "jest"
  ],
  "rules": {
      "indent": [
          "error",
          2
      ],
      "linebreak-style": [
          "error",
          "unix"
      ],
      "quotes": [
          "error",
          "single"
      ],
      "semi": [
          "error",
          "never"
      ],
      "eqeqeq": "error",
      "no-trailing-spaces": "error",
      "object-curly-spacing": [
          "error", "always"
      ],
      "arrow-spacing": [
          "error", { "before": true, "after": true }
      ],
      "no-console": 0,
      "react/prop-types": 0
  }
};
```
**.eslintignore** . 
E.g.  
```
cypress
node_modules
build
```

Add script to package.json:
`"eslint": "eslint ."`

**Webpack** . 
See [webpack-from-scratch](https://github.com/ClareBee/fullstackopen/tree/master/07/webpack_from_scratch)

**MaterialUI** . 
https://material-ui.com/

`npm i @material-ui/core`

- Add Roboto Font:
```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
```
- Add Font Icons:
```
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
```

**Handy Blog Post**:  
https://alligator.io/react/material-ui/ . 

**SemanticUI** . 
https://react.semantic-ui.com/ . 
` yarn add semantic-ui-react`
e.g.
```javascript
import React from 'react'
import { Button } from 'semantic-ui-react'

const ButtonExampleButton = () => <Button>Click Here</Button>

export default ButtonExampleButton
```
