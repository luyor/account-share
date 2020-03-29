import React, { useState, useEffect } from 'react'
import { PeerInterface } from 'p2p/peer'

export interface FriendItemProp { friend: PeerInterface }

function useFriendAlive(friend: PeerInterface) {
  const [alive, setAlive] = useState(false)

  useEffect(() => {
    const sub = friend.alive$.subscribe(setAlive)
    return sub.unsubscribe
  }, [friend.alive$])

  return alive
}

function FriendItem(props: FriendItemProp) {
  const { friend } = props
  const alive = useFriendAlive(friend)
  return (
    <div>
      <div>{friend.id}</div>
      <div>{alive}</div>
    </div>
  )
}
export default FriendItem