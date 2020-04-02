import Node from 'p2p/node'

// BackgroundPublic contains public objects of background scripts,
// can be access in popup by chrome.extension.getBackground()
class BackgroundPublic {
  constructor(
    public node: Node
  ) { }

  public static async create() {
    const node = await Node.getInstance()
    const background = new BackgroundPublic(node)

    // @ts-ignore
    window.background = background
    return background
  }

  public static getBackgroundPublic(): BackgroundPublic {
    // @ts-ignore
    return chrome.extension.getBackgroundPage().background
  }
}

export default BackgroundPublic