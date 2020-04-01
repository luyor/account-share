import { Box } from '@material-ui/core';
import React from 'react';
import FriendList from './list';
import AddFriendLayer from './add'

function FriendsPanel() {
  return (
    <Box>
      <FriendList />
      <AddFriendLayer />
    </Box>
  )
}

export default FriendsPanel