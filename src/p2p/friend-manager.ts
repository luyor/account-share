import { Peer, PeerJson } from 'p2p/peer'
import { BehaviorSubject, interval } from 'rxjs'
import * as Storage from 'utils/storage'
import Node from './node'
import BackgroundPublic from 'background/public'

const loadFriendsJson = () => Storage.local.get(Storage.Keys.Friends) as Promise<PeerJson[]>
const saveFriendsJson = (json: PeerJson[]) => Storage.local.set(Storage.Keys.Friends, json)

// FriendManager singleton
class FriendManager {
  readonly friends$: BehaviorSubject<Map<string, Peer>>
  private constructor(
    private readonly node: Node,
    friendMap: Map<string, Peer>,
    public updateLatencyInterval = 3000,
  ) {
    this.friends$ = new BehaviorSubject<Map<string, Peer>>(friendMap)
    this.updateLatencyOnInterval()
  }

  private static instance: Promise<FriendManager>
  public static async getInstance() {
    if (!FriendManager.instance) {
      FriendManager.instance = (async () => {
        const node = await BackgroundPublic.getBackgroundPublic().node
        const friends = await FriendManager.loadFriends()
        const fm = new FriendManager(node, friends)
        return fm
      })()
    }
    return FriendManager.instance;
  }

  static async loadFriends() {
    const friendMap = new Map<string, Peer>()
    try {
      const friendsJson = await loadFriendsJson()
      const friends = await Promise.all(friendsJson.map(Peer.fromJson))
      friends.forEach(f => {
        if (f !== undefined) {
          friendMap.set(f.id, f)
        }
      })
    } catch (e) {
      console.log(e)
    }
    return friendMap
  }

  updateLatencyOnInterval() {
    interval(this.updateLatencyInterval)
      .subscribe(
        () => this.friends$.value.forEach(
          friend => friend.updateLatency(this.node)
        )
      )
  }

  async addFriend(friend: Peer) {
    if (friend.id in this.friends$.value) {
      throw new Error("duplicate peer id")
    }
    const newFriendsMap = new Map(this.friends$.value)
    newFriendsMap.set(friend.id, friend)
    await saveFriendsJson(Array.from(newFriendsMap.values()).map(v => v.toJson()))
    this.friends$.next(newFriendsMap)
  }
}

export default FriendManager