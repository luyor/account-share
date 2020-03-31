import { GridList } from '@material-ui/core'
import FriendManager from 'p2p/friend-manager'
import { Peer } from 'p2p/peer'
import React, { useEffect, useState } from 'react'
import FriendItem from './item'

function useFriends() {
  const [friends, setFriends] = useState(new Map<string, Peer>())

  useEffect(() => {
    (async () => {
      const fm = await FriendManager.getInstance()
      const sub = fm.friends$.subscribe(v => {
        console.log("new list")
        setFriends(v)
      })
      return sub.unsubscribe
    })()
  }, [])

  return friends
}

function FriendList() {
  const friends = useFriends()
  console.log("render")
  return (
    <GridList>
      {Array.from(friends.values()).map(friend =>
        <FriendItem key={friend.id} friend={friend} />
      )}
    </GridList>
  )
}

export default FriendList