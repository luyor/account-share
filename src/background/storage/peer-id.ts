import PeerId from 'peer-id'

const key = 'peerId'

// Get my peer id from chrome.storage.local, generate one if not exist
const getMyPeerId = async (): Promise<PeerId> => {
  return new Promise(resolve => {
    chrome.storage.local.get([key], async items => {
      try {
        const id = await PeerId.createFromJSON(items[key])
        resolve(id)
      } catch (e) {
        console.log(e)
        const id = await PeerId.create()
        chrome.storage.local.set({ [key]: id.toJSON() }, () => {
          resolve(id)
        })
      }
    })
  })
}

export { getMyPeerId }