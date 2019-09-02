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
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}))

const CommentList = (props) => {
  const classes = useStyles()

  return (
    <List className={classes.root}>
      {props.blog.comments.map(comment =>
        <React.Fragment key={comment.id}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Icon>person</Icon>
            </ListItemAvatar>
            <ListItemText
              primary="Anon"
              secondary={comment.comment}
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </React.Fragment>
      )}
    </List>
  )
}

export default CommentList
