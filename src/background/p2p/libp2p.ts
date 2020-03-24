import Libp2p from 'libp2p'
import Websockets from 'libp2p-websockets'
import WebRTCStar from 'libp2p-webrtc-star'
import Secio from 'libp2p-secio'
import Mplex from 'libp2p-mplex'
import Bootstrap from 'libp2p-bootstrap'
import DHT from 'libp2p-kad-dht'
import PeerInfo from 'peer-info'
import Multiaddr from 'multiaddr'
import PeerId from 'peer-id'
import * as Storage from 'utils/storage'


const bootstrapers = [
  '/dns4/ams-1.bootstrap.libp2p.io/tcp/443/wss/p2p/QmSoLer265NRgSp2LA3dPaeykiS1J6DifTC88f5uVQKNAd',
  '/dns4/lon-1.bootstrap.libp2p.io/tcp/443/wss/p2p/QmSoLMeWqB7YGVLJN3pNLQpmmEk35v6wYtsMGLzSr5QBU3',
  '/dns4/sfo-3.bootstrap.libp2p.io/tcp/443/wss/p2p/QmSoLPppuBtQSGwKDZT2M73ULpjvfd3aZ6ha4oFGL1KrGM',
  '/dns4/sgp-1.bootstrap.libp2p.io/tcp/443/wss/p2p/QmSoLSafTMBsPKadTEgaXctDQVcqN88CNLHXMkTNwMKPnu',
  '/dns4/nyc-1.bootstrap.libp2p.io/tcp/443/wss/p2p/QmSoLueR4xBeUbY9WZ9xGUUxunbKWcrNFTDAadQJmocnWm',
  '/dns4/nyc-2.bootstrap.libp2p.io/tcp/443/wss/p2p/QmSoLV4Bbm51jM9C4gDYZQ9Cy3U6aXMJDAbzgu2fzaDs64',
]

const webrtcStarAddr = Multiaddr('/ip4/127.0.0.1/tcp/9090/wss/p2p-webrtc-star')

const options = {
  modules: {
    transport: [Websockets, WebRTCStar],
    connEncryption: [Secio],
    streamMuxer: [Mplex],
    peerDiscovery: [Bootstrap],
    dht: DHT,
  },
  config: {
    peerDiscovery: {
      autoDial: true,
      [Bootstrap.tag]: {
        enabled: true,
        list: bootstrapers,
      }
    },
    dht: {
      enabled: true,
      // randomWalk: {
      //   enabled: true
      // }
    }
  }
}

// Get my peer id from chrome.storage.local, generate one if not exist
async function getMyPeerId() {
  try {
    const idJson = await Storage.local.get(Storage.Keys.PeerId)
    return await PeerId.createFromJSON(idJson)
  } catch  {
    const id = await PeerId.create()
    await Storage.local.set(Storage.Keys.PeerId, id.toJSON())
    return id
  }
}

async function create() {
  const peerId = await getMyPeerId()
  const peerInfo = await PeerInfo.create(peerId)
  peerInfo.multiaddrs.add(webrtcStarAddr.encapsulate(`/p2p/${peerId.toB58String()}`))

  const libp2p = await Libp2p.create({ ...options, peerInfo })
  console.log(`my peer id is ${peerId.toB58String()}`)

  await libp2p.start()
  return libp2p
}

export { create }