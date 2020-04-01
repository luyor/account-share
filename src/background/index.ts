import BackgroundPublic from 'background/public'

async function main() {
  const background = await BackgroundPublic.create()
  const node = background.node
  const targetId = "/p2p/QmSoLer265NRgSp2LA3dPaeykiS1J6DifTC88f5uVQKNAd"
  const latency = await node.libp2p.ping(targetId)
  console.log(`latency to ${targetId}: ${latency}`)
}

main()