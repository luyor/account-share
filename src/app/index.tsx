import React from 'react'
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import FriendsPanel from './friends'

const useStyles = makeStyles({
  root: {
    height: "300px",
    width: "200px",
  }
})

function App() {
  const styles = useStyles()
  return (
    <Container className={styles.root}>
      <FriendsPanel />
    </Container>
  );
}

export default App;
