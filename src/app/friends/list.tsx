import { GridList } from '@material-ui/core'
import FriendManager from 'p2p/friend-manager'
import { PeerInterface } from 'p2p/peer'
import React, { useEffect, useState } from 'react'
import FriendItem from './item'

function useFriends() {
  const [friends, setFriends] = useState(new Set<PeerInterface>())

  useEffect(() => {
    (async () => {
      const fm = await FriendManager.getInstance()
      const sub = fm.friends$.subscribe(setFriends)
      return sub.unsubscribe
    })()
  }, [])

  return friends
}

function FriendList() {
  const friends = useFriends()
  return (
    <GridList>
      {Array.from(friends).map(friend =>
        <FriendItem key={friend.id} friend={friend} />
      )}
    </GridList>
  )
}

export default FriendList