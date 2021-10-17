const fs = require('fs')
const { exec } = require('child_process')

const DEFAULT_WALLPAPER = '/System/Library/CoreServices/DefaultDesktop.heic'
const DELAY = 400

const getImages = async (dir) => {
  return new Promise((resolve) => (fs.readdir(dir, (_err, files) => resolve(files))))
}

const changeImage = (imgDir) => {
  const script = `osascript -e "tell application \\"System Events\\" to tell every desktop to set picture to \\"${imgDir}\\" as POSIX file"`
  exec(script, (err) => {
    if (err) {
      throw (err)
    }
  })
}

const executeChangeImage = async (list, counter) => {
  const next = list[counter % list.length]
  try {
    changeImage(next)
    return counter
  } catch (err) {
    console.error(err)
    throw (err)
  }
}

const makePendulumSeq = (seqs) => {
  return [...seqs, ...[...seqs].reverse().slice(1, seqs.length - 1)]
}

const executeDynamacWallpaper = async (dir) => {
  let counter = 0
  const list = []
  const images = await getImages(dir)
  const seqImages = makePendulumSeq(images)
  const p = dir
  for (const image of seqImages) {
    list.push(`${p}/${image}`)
  }
  /**
     * list should be like 1 2 3 2
     */
  let run
  setTimeout(
    (run = async () => {
      counter = await executeChangeImage(list, counter)
      counter++
      setTimeout(run, DELAY)
    }),
    DELAY
  )
}

module.exports = {
  executeChangeImage,
  executeDynamacWallpaper,
  getImages,
  DEFAULT_WALLPAPER
}
