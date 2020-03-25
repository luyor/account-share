import React from 'react'
import { Box, Fab } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Add as AddIcon } from '@material-ui/icons'

import FriendManager from 'p2p/friend-manager'

const useStyles = makeStyles(theme =>
  createStyles({
    fab: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    }
  }),
);

function FriendsPanel() {
  const styles = useStyles()
  return (
    <Box>
      <Fab
        color="primary"
        aria-label="add"
        size="small"
        className={styles.fab}
      >
        <AddIcon />
      </Fab>
    </Box>
  )
}

export default FriendsPanel