import PeerId from 'peer-id'
import PeerInfo from 'peer-info'
import { from, BehaviorSubject } from 'rxjs'
import { map } from 'rxjs/operators'
import Node from './node'

export interface PeerJson {
  id: string
  protocol: string
}

export abstract class Peer {
  static async fromJson(json: PeerJson) {
    switch (json.protocol) {
      case Libp2pPeer.protocol:
        return Libp2pPeer.fromJson(json)
      default:
        console.error(`not supported peer json protocol: ${json.protocol}`, json)
    }
  }
  abstract readonly id: string
  abstract readonly protocol: string
  // < 0 means not connected
  latency$ = new BehaviorSubject<number>(-1)
  alive$ = this.latency$.pipe(
    map(latency => latency >= 0)
  )

  updateLatency(node: Node) {
    from(this.ping(node)).subscribe(
      v => this.latency$.next(v)
    )
  }
  abstract async ping(node: Node): Promise<number>
  abstract toJson(): PeerJson
}

export class Libp2pPeer extends Peer {
  static protocol = "p2p"
  readonly id: string
  readonly protocol = Libp2pPeer.protocol
  constructor(
    readonly peerInfo: PeerInfo,
  ) {
    super()
    this.id = peerInfo.id.toB58String()
  }

  async ping(node: Node) {
    return await node.libp2p.ping(this.peerInfo)
  }

  static async fromId(id: PeerId) {
    const info = await PeerInfo.create(id)
    return new Libp2pPeer(info)
  }

  static async fromJson(json: object) {
    const id = await PeerId.createFromJSON(json as PeerId.JSONPeerId)
    return await Libp2pPeer.fromId(id)
  }

  toJson(): PeerJson {
    return {
      ...this.peerInfo.id.toJSON(),
      protocol: this.protocol,
    }
  }
}