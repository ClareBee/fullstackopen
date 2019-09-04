import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Icon from '@material-ui/core/Icon'

const useStyles = makeStyles(theme => ({
  root: {
    width: '50%',
    margin: '0 auto',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}))

const CommentList = ({ blog }) => {
  const classes = useStyles()
  if(!blog.comments){
    return null
  }
  const comments = blog.comments.reverse()
  return (
    <List className={classes.root}>
      {comments.map((comment, index) =>
        <div key={index}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Icon>person</Icon>
            </ListItemAvatar>
            <ListItemText
              primary="Anon"
              secondary={comment.comment}
            />
          </ListItem>
          <Divider component="li" />
        </div>
      )}
    </List>
  )
}

export default CommentList
