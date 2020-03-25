import React from 'react'
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import FriendsPanel from './friends-panel'

const useStyles = makeStyles({
  root: {
    minHeight: "150px",
    minWidth: "150px",
    backgroundColor: "#282c34",
  }
})

function App() {
  const styles = useStyles()
  return (
    <Container className={styles.root}>
      <FriendsPanel></FriendsPanel>
    </Container>
  );
}

export default App;
