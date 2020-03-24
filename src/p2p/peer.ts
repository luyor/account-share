import PeerInfo from 'peer-info'
import PeerId from 'peer-id'

import Node from './node'

export abstract class PeerInterface {
  // negative means not connected
  private _latency: number = -1
  get latency() {
    return this._latency
  }
  get alive() { return this.latency < 0 }

  async updateLatency(node: Node) {
    this._latency = await this.ping(node)
  }
  abstract async ping(node: Node): Promise<number>
}

export class Libp2pPeer extends PeerInterface {
  constructor(
    readonly peerInfo: PeerInfo,
  ) { super() }

  async ping(node: Node) {
    return await node.libp2p.ping(this.peerInfo)
  }

  static async fromJson(json: PeerId.JSONPeerId) {
    const id = await PeerId.createFromJSON(json)
    const info = await PeerInfo.create(id)
    return new Libp2pPeer(info)
  }

  toJson(): PeerId.JSONPeerId {
    return this.peerInfo.id.toJSON()
  }
}