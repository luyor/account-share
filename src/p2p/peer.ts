import PeerId from 'peer-id'
import PeerInfo from 'peer-info'
import { BehaviorSubject } from 'rxjs'
import { map } from 'rxjs/operators'
import Node from './node'


export abstract class PeerInterface {
  abstract id: string
  // < 0 means not connected
  latency$ = new BehaviorSubject<number>(-1)
  alive$ = this.latency$.pipe(
    map(latency => latency >= 0)
  )

  async updateLatency(node: Node) {
    this.latency$.next(await this.ping(node))
  }
  abstract async ping(node: Node): Promise<number>
}

export class Libp2pPeer extends PeerInterface {
  readonly id: string
  constructor(
    readonly peerInfo: PeerInfo,
  ) {
    super()
    this.id = peerInfo.id.toString()
  }

  async ping(node: Node) {
    return await node.libp2p.ping(this.peerInfo)
  }

  static async fromId(id: PeerId) {
    const info = await PeerInfo.create(id)
    return new Libp2pPeer(info)
  }

  static async fromJson(json: PeerId.JSONPeerId) {
    const id = await PeerId.createFromJSON(json)
    return await Libp2pPeer.fromId(id)
  }

  toJson(): PeerId.JSONPeerId {
    return this.peerInfo.id.toJSON()
  }
}