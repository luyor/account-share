import PeerId from 'peer-id'
import Node from './node'

import * as Storage from 'utils/storage'
import { PeerInterface, Libp2pPeer } from 'p2p/peer'
import { EventEmitter } from 'events'

// FriendManager singleton
class FriendManager {
  private constructor(
    private readonly node: Node,
    readonly friends: PeerInterface[],
    readonly updateLatencyInterval = 3000,
  ) {
    setInterval(this.updateLatency, updateLatencyInterval)
  }

  private static instance: FriendManager
  public static async getInstance() {
    if (!FriendManager.instance) {
      const node = await Node.getInstance()
      const friends = await FriendManager.loadFriends()
      const fm = new FriendManager(node, friends)
      FriendManager.instance = fm
    }
    return FriendManager.instance;
  }

  static key = Storage.Keys.FriendTypeLibp2p

  static async loadFriends() {
    try {
      const friendsJson = await Storage.local.get(FriendManager.key) as PeerId.JSONPeerId[]
      const friends = await Promise.all(friendsJson.map(v => Libp2pPeer.fromJson(v)))
      console.info(`Loaded ${friends.length} friends`, friends)
      return friends
    } catch{
      return []
    }
  }

  async addFriend(peer: PeerInterface) {
    this.friends.push(peer)
  }

  private updateLatency() {
    this.friends.forEach(async f => f.updateLatency(this.node))
  }
}

export default FriendManager