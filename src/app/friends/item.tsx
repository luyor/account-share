import React, { useState, useEffect } from 'react'
import { Peer } from 'lib/p2p/peer'
import { Typography, Box, Button } from '@material-ui/core'
import FriendManager from 'lib/p2p/friend-manager'

export interface FriendItemProp { friend: Peer }

function useFriendAlive(friend: Peer) {
  const [alive, setAlive] = useState(false)

  useEffect(() => {
    const sub = friend.alive$.subscribe(setAlive)
    return () => sub.unsubscribe()
  }, [friend.alive$])

  return alive
}

function handleDelete(friend: Peer) {
  (async () => {
    const fm = await FriendManager.getInstance()
    fm.deleteFriend(friend)
  })()
}

function FriendItem(props: FriendItemProp) {
  const { friend } = props
  const alive = useFriendAlive(friend)
  return (
    <Box>
      <Typography style={{ wordBreak: 'break-word' }}>{friend.id}</Typography>
      <Typography>{alive ? "online" : "offline"}</Typography>
      <Button aria-label="delete" onClick={() => handleDelete(friend)}>delete</Button>
    </Box>
  )
}
export default FriendItem