import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BlogForm from './BlogForm'
import Notification from './Notification'
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}))

const BlogList = (props) => {
  const classes = useStyles()
  return (
    <div>
      <Notification />
      <BlogForm />
      <h2>Blogs</h2>
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          {props.blogs.map(blog => (
            <Grid item key={blog.id} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image="https://source.unsplash.com/random"
                  title="Image title"
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {blog.title}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link to={`/blogs/${blog.id}`}>View</Link>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  )
}

const orderByLikes = blogs => {
  return blogs.sort((a,b) => b.likes - a.likes)
}

BlogForm.propTypes = {
  blogs: PropTypes.array,
  user: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    blogs: orderByLikes(state.blogs),
    user: state.user,
    // check this works and make naming consistent
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps, null)(BlogList)
