import Libp2p from 'libp2p'
import pipe from 'it-pipe'
import PeerInfo from 'peer-info'

import { create as createLibp2p } from './libp2p'

// Node singleton maintains p2p functions
export default class Node {
  private constructor(
    readonly libp2p: Libp2p
  ) { }

  private static instance: Node
  public static async getInstance() {
    if (!Node.instance) {
      const libp2p = await createLibp2p()
      const node = new Node(libp2p)
      Node.instance = node
      node.setup()
    }
    return Node.instance;
  }

  private setup() {
    this.libp2p.on('peer:discovery', (peerInfo: PeerInfo) => {
      console.log(`Found peer ${peerInfo.id}\n`, peerInfo.multiaddrs.toArray().forEach(v => v.inspect()))
    })
    this.libp2p.handle('/echo/1.0.0', ({ stream }: any) => pipe(stream.source, stream.sink))
  }
}
