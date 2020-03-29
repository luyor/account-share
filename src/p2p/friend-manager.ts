import { Libp2pPeer, PeerInterface } from 'p2p/peer'
import PeerId from 'peer-id'
import { BehaviorSubject, interval } from 'rxjs'
import * as Storage from 'utils/storage'
import Node from './node'

// FriendManager singleton
class FriendManager {
  private constructor(
    private readonly node: Node,
    readonly friends$: BehaviorSubject<Set<PeerInterface>>,
    updateLatencyInterval = 3000,
  ) {
    interval(updateLatencyInterval)
      .subscribe(
        () => this.friends$.value.forEach(
          friend => friend.updateLatency(node)
        )
      )
  }

  private static instance: FriendManager
  public static async getInstance() {
    if (!FriendManager.instance) {
      const node = await Node.getInstance()
      const initFriends = await FriendManager.loadFriendsLibp2p()
      const fm = new FriendManager(node, new BehaviorSubject<Set<PeerInterface>>(initFriends))
      FriendManager.instance = fm
    }
    return FriendManager.instance;
  }

  static async loadFriendsLibp2p() {
    try {
      const friendsJson = await Storage.local.get(Storage.Keys.FriendLibp2p) as PeerId.JSONPeerId[]
      const friends = await Promise.all(friendsJson.map(v => Libp2pPeer.fromJson(v)))
      console.info(`Loaded ${friends.length} friends`, friends)
      return new Set(friends)
    } catch{
      return new Set<PeerInterface>()
    }
  }

  async addFriend(friend: PeerInterface) {
    const newFriendSet = this.friends$.value.add(friend)
    await Storage.local.set(Storage.Keys.FriendLibp2p, Array.from(newFriendSet))
    this.friends$.next(newFriendSet)
  }
}

export default FriendManager