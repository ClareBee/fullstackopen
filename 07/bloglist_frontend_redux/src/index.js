
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import cyan from '@material-ui/core/colors/cyan'
import pink from '@material-ui/core/colors/pink'
import red from '@material-ui/core/colors/red'


const theme = createMuiTheme({
  palette: {
    primary: {
      main: cyan[300]
    },
    secondary: {
      main: cyan[300]
    },
    error: {
      main: red[300]
    },
    accent: pink[500]
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
})

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
)
