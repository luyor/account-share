import { Fab, Dialog, Button, TextField, InputAdornment } from '@material-ui/core'
import { Add as AddIcon } from '@material-ui/icons'
import React, { useState } from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import FriendManager from 'lib/p2p/friendManager'
import { Libp2pPeer } from 'lib/p2p/peer'
import PeerId from 'peer-id'

const useStyles = makeStyles(theme =>
  createStyles({
    fab: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  }),
)


function AddFriendDialog(props: { open: boolean, handleClose: () => void }) {
  const { open, handleClose } = props
  const [idInput, setIdInput] = useState("")

  const handleSubmit = () => {
    (async () => {
      try {
        const id = PeerId.createFromB58String(idInput)
        const friend = await Libp2pPeer.fromId(id)
        const fm = await FriendManager.getInstance()
        await fm.addFriend(friend)
        handleClose()
      } catch (e) {
        console.error(e)
      }
    })()
  }

  return (
    <Dialog fullScreen open={open} onClose={handleClose} >
      <TextField
        value={idInput}
        onChange={event => { setIdInput(event.target.value) }}
        label="Friend id"
        InputProps={{
          startAdornment: <InputAdornment position="start">/p2p/</InputAdornment>,
        }}
      />
      <div>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          save
        </Button>
        <Button variant="contained" color="primary" onClick={handleClose}>
          close
        </Button>
      </div>
    </Dialog>
  )
}

function AddButton(props: { handleClickOpen: () => void }) {
  const styles = useStyles()
  return (
    <Fab
      color="primary"
      aria-label="add"
      size="small"
      className={styles.fab}
      onClick={props.handleClickOpen}
    >
      <AddIcon />
    </Fab>
  )
}

function AddFriendLayer() {
  const [open, setOpen] = useState(false)
  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  return (
    <span>
      <AddFriendDialog open={open} handleClose={handleClose} />
      <AddButton handleClickOpen={handleClickOpen} />
    </span>

  )
}

export default AddFriendLayer