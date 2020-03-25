import React from 'react'
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import FriendsPanel from './friends'

const useStyles = makeStyles({
  root: {
    minHeight: "300px",
    minWidth: "200px",
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
