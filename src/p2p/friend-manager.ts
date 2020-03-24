import PeerId from 'peer-id'

import * as Storage from 'utils/storage'
import { PeerInterface, Libp2pPeer } from 'p2p/peer'

export namespace FriendManager {
  const key = Storage.Keys.FriendTypeLibp2p

  async function getFriends() {
    let peers: PeerInterface[] = []
    try {
      const friendsJson = await Storage.local.get(key) as PeerId.JSONPeerId[]
      const friends = await Promise.all(friendsJson.map(async v => Libp2pPeer.fromJson(v)))
      peers.push(...friends)
    } catch{ }
    return peers
  }

  async function addFriend() {

  }
}