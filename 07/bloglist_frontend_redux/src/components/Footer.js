import React from 'react'
import { Container, Typography, Link } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/clarebee">
        ClareBee
      </Link>{' '}
      {new Date().getFullYear()}
      {'. Styled with '}
      <Link color="inherit" href="https://material-ui.com/">
        Material-UI.
      </Link>
    </Typography>
  )
}
const useStyles = makeStyles(theme => ({
  footer: {
    padding: theme.spacing(2),
    marginTop: 'auto',
    backgroundColor: 'white',
    borderTop: '3px solid cyan'
  },
}))

const Footer = () => {
  const classes = useStyles()

  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        <Typography variant="h6" align="center" gutterBottom>
          <Link color="inherit" href="https://fullstackopen.com">
            FullStackOpen 2019 - University of Helsinki
          </Link>
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Made using React, MaterialUI, ExpressJS, MongoDB & tested with Cypress
        </Typography>
        <Copyright />
      </Container>
    </footer>
  )
}

export default Footer
