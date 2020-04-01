import React from 'react'
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
    <div className={styles.root}>
      <FriendsPanel />
    </div>
  );
}

export default App;
