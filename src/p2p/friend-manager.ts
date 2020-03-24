import PeerId from 'peer-id'

import * as Storage from 'utils/storage'
import { PeerInterface, Libp2pPeer } from 'p2p/peer'

// FriendManager singleton
export class FriendManager {
  constructor(
    readonly friends: PeerInterface[]
  ) { }

  private static instance: FriendManager
  public static async getInstance() {
    if (!FriendManager.instance) {
      const friends = await FriendManager.loadFriends()
      const fm = new FriendManager(friends)
      FriendManager.instance = fm
    }
    return FriendManager.instance;
  }

  static key = Storage.Keys.FriendTypeLibp2p

  static async loadFriends() {
    let peers: PeerInterface[] = []
    try {
      const friendsJson = await Storage.local.get(FriendManager.key) as PeerId.JSONPeerId[]
      const friends = await Promise.all(friendsJson.map(v => Libp2pPeer.fromJson(v)))
      peers.push(...friends)
    } catch{ }
    return peers
  }

  async addFriend(peer: PeerInterface) {

  }
}