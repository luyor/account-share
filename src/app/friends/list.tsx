import { List, ListItem } from '@material-ui/core'
import FriendManager from 'lib/p2p/friend-manager'
import { Peer } from 'lib/p2p/peer'
import React, { useEffect, useState } from 'react'
import FriendItem from './item'

function useFriends() {
  const [friends, setFriends] = useState(new Map<string, Peer>())

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
    <List>
      {Array.from(friends.values()).map(friend =>
        <ListItem key={friend.id} divider>
          <FriendItem friend={friend} />
        </ListItem>
      )}
    </List >
  )
}

export default FriendList