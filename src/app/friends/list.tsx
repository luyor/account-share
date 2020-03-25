import React, { useState, useEffect } from 'react'
import { GridList } from '@material-ui/core'

import FriendManager from 'p2p/friend-manager'

function useFriendsStatus(fm: FriendManager) {
  const [friendsOnline, setFriendsOnline] = useState([])

  useEffect(() => {

  })

  return friendsOnline
}

function FriendsList() {
  return (
    <GridList >

    </GridList>
  )
}

export default FriendsList