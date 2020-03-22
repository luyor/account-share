import Node from './p2p'

async function main() {
  const node = await Node.getInstance()

  const latency = await node.libp2p.ping("/p2p/QmSoLer265NRgSp2LA3dPaeykiS1J6DifTC88f5uVQKNAd")
  console.log(`latency: ${latency}`)
}

main()