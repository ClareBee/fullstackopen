## Learning Notes
**ExpressJS**

**MongoDB & mongoose**

**Deployment**

**REST & axios**

**JS functions - filter, map, reduce**

**back end testing with Jest**
npm install --save-dev jest
"test": "jest --verbose"
"jest": {
  "testEnvironment": "node"
}
eslint
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
"test": "NODE_ENV=test jest --verbose --runInBand"
windows compatibility
npm install --save-dev cross-env
"scripts": {
  "start": "cross-env NODE_ENV=production node index.js",
  "watch": "cross-env NODE_ENV=development nodemon index.js",
  // ...
  "test": "cross-env NODE_ENV=test jest --verbose --runInBand",
},
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
npm install --save-dev supertest
npm install -g jest
npx jest tests/note_api.test.js --runInBand
npx jest -t 'a specific note is within the returned notes'

The test imports the Express application from the app.js module and wraps it with the supertest function into a so-called superagent object. This object is assigned to the api variable and tests can use it for making HTTP requests to the backend.
https://fullstackopen.com/en/part4/testing_the_backend

**localStorage & JWT**
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

**Refs**
https://reactjs.org/docs/refs-and-the-dom.html
**useState**

**Effect Hooks**
The Effect Hook lets you perform side effects in function components. Data fetching, setting up a subscription, and manually changing the DOM in React components are all examples of side effects.
**PropTypes**
npm install --save prop-types
LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

**JsonServer**

npm install json-server --save
"scripts": {
  "server": "json-server -p3001 db.json",
  // ...
}
npm run server
npm install axios --save

import axios from 'axios'

const baseUrl = 'http://localhost:3001/notes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default { getAll }

import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import NewNote from './components/NewNote'
import Notes from './components/Notes'
import VisibilityFilter from './components/VisibilityFilter'
import noteService from './services/notes'
import { initializeNotes } from './reducers/noteReducer'

const App = (props) => {
  useEffect(() => {
    noteService
      .getAll().then(notes => props.initializeNotes(notes))
  },[])

  return (
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  )
}

export default connect(null, { initializeNotes })(App)
**Redux**
npm install redux --save

immutability
npm install --save-dev deep-freeze
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
combineReducers
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

console.log(store.getState())

ReactDOM.render(
  <App store={store} />,
  document.getElementById('root')
)
**ReactRouter**

npm install --save react-router-dom
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'

const App = () => {

  const padding = { padding: 5 }

  return (
    <div>
      <Router>
        <div>
          <div>
            <Link style={padding} to="/">home</Link>
            <Link style={padding} to="/notes">notes</Link>
            <Link style={padding} to="/users">users</Link>
          </div>
          <Route exact path="/" render={() => <Home />} />
          <Route path="/notes" render={() => <Notes />} />
          <Route path="/users" render={() => <Users />} />

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
BrowserRouter is a Router that uses the HTML5 history API (pushState, replaceState and the popState event) to keep your UI in sync with the URL.

**ReactTestingLibrary**
npm install --save-dev @testing-library/react @testing-library/jest-dom
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
https://testing-library.com/docs/react-testing-library/api#debug
**Cypress**
```
npm install --save-dev cypress
```
add to `package.json` script block: `"cypress:open": "cypress open"`

To backend `package.json` script block: `"start:test": "cross-env NODE_ENV=test node index.js"`

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
The to beforeEach() in FE tests, reset db:
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


**ESLint**
npm add --save-dev eslint-plugin-jest
.eslintrc.js
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

.eslintignore
node_modules
build

package.json
"eslint": "eslint ."

**Webpack**

**MaterialUI**

https://material-ui.com/
`npm i @material-ui/core`
Roboto Font:
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
Font Icons:
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

Handy Blog Post:
https://alligator.io/react/material-ui/
