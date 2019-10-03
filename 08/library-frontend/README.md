`yarn add apollo-boost react-apollo graphql`

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import ApolloClient, { gql } from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})

ReactDOM.render(
  <ApolloProvider client={client} >
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
```
