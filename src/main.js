const wallpaper = require('wallpaper')
const {
  DEFAULT_WALLPAPER,
  executeDynamacWallpaper
} = require('./custom-wallpaper')
let currentWallpaper = DEFAULT_WALLPAPER
const main = async () => {
  currentWallpaper = await wallpaper.get()
  // SET CUSTOM
  const dir = '/Users/nattapat/safesuk/private-dynamac-wallpaper/wallpapers'
  executeDynamacWallpaper(dir)
}
main()

process.on('SIGINT', async () => {
  await wallpaper.set(currentWallpaper)
  process.exit()
})
