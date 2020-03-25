import Node from 'p2p/node'

async function main() {
  const node = await Node.getInstance()

  const targetId = "/p2p/QmSoLer265NRgSp2LA3dPaeykiS1J6DifTC88f5uVQKNAd"
  const latency = await node.libp2p.ping(targetId)
  console.log(`latency to ${targetId}: ${latency}`)
}

main()