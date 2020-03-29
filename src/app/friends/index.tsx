import { Box } from '@material-ui/core';
import React from 'react';
import FriendList from './list';
import AddFriendLayer from './add'

function FriendsPanel() {
  return (
    <Box>
      <AddFriendLayer />
      <FriendList />
    </Box>
  )
}

export default FriendsPanel