import React, { useState, useEffect } from 'react'
import { Peer } from 'p2p/peer'
import { Card, CardContent, Typography } from '@material-ui/core'

export interface FriendItemProp { friend: Peer }

function useFriendAlive(friend: Peer) {
  const [alive, setAlive] = useState(false)

  useEffect(() => {
    const sub = friend.alive$.subscribe(setAlive)
    return () => sub.unsubscribe()
  }, [friend.alive$])

  return alive
}

function FriendItem(props: FriendItemProp) {
  const { friend } = props
  const alive = useFriendAlive(friend)
  console.log(alive)
  return (
    <Card>
      <CardContent>
        <Typography>{friend.id}</Typography>
        <Typography>{alive ? "alive" : "dead"}</Typography>
      </CardContent>
    </Card>
  )
}
export default FriendItem