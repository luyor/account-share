enum Keys {
  PeerId = "PeerId",
  FriendTypeLibp2p = "FriendTypeLibp2p",
}

class ChromeStorage {
  private constructor(private readonly area: chrome.storage.StorageArea) { }

  static local = new ChromeStorage(chrome.storage.local)
  static sync = new ChromeStorage(chrome.storage.sync)

  async get(key: string) {
    return new Promise<any>((resolve, reject) => {
      this.area.get([key], async items => {
        chrome.runtime.lastError === undefined && items[key] !== undefined ?
          resolve(items[key]) :
          reject(chrome.runtime.lastError)
      })
    })
  }

  async set(key: string, value: any) {
    return new Promise<any>((resolve, reject) => {
      this.area.set({ [key]: value }, () => {
        chrome.runtime.lastError === undefined ?
          resolve() :
          reject(chrome.runtime.lastError)
      })
    })
  }
}


const local = ChromeStorage.local
const sync = ChromeStorage.sync
export { Keys, local, sync }
