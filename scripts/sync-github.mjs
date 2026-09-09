import { mkdir, rm, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const owner = 'ShyiGoldink'
const repository = 'DrawDayLog'
const branch = 'main'
const interval = 15 * 60 * 1000
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dataRoot = path.join(projectRoot, 'src', 'data')
const blogsRoot = path.join(dataRoot, 'blogs')
const apiRoot = `https://api.github.com/repos/${owner}/${repository}/contents`

async function getJson(url) {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`GitHub API request failed: ${response.status} ${response.statusText}`)
  return response.json()
}

async function getDirectory(directory = '') {
  const suffix = directory ? `/${directory}` : ''
  return getJson(`${apiRoot}${suffix}?ref=${branch}`)
}

async function downloadFile(url) {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`Download failed: ${url}`)
  return Buffer.from(await response.arrayBuffer())
}

function toImportPath(filePath) {
  return `./${path.relative(dataRoot, filePath).split(path.sep).join('/')}`
}

async function syncBlogs() {
  const root = await getDirectory()
  const dateDirectories = root
    .filter(item => item.type === 'dir' && /^\d{8}$/.test(item.name))
    .sort((a, b) => b.name.localeCompare(a.name))
  const records = []
  const imageImports = []

  await rm(blogsRoot, { recursive: true, force: true })
  await mkdir(blogsRoot, { recursive: true })

  for (const dateDirectory of dateDirectories) {
    const timeDirectories = (await getDirectory(dateDirectory.path))
      .filter(item => item.type === 'dir' && /^\d{6}$/.test(item.name))
      .sort((a, b) => b.name.localeCompare(a.name))

    for (const timeDirectory of timeDirectories) {
      const directory = `${dateDirectory.name}/${timeDirectory.name}`
      const files = await getDirectory(directory)
      const localDirectory = path.join(blogsRoot, dateDirectory.name, timeDirectory.name)
      await mkdir(localDirectory, { recursive: true })
      const textFile = files.find(file => file.name === 'text.txt')
      const texts = textFile ? (await downloadFile(textFile.download_url)).toString('utf8').trim() : ''
      if (textFile) await writeFile(path.join(localDirectory, 'text.txt'), texts)

      const imgsaddr = []
      const images = files
        .filter(file => file.type === 'file' && /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file.name))
        .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }))
      for (const image of images) {
        const localImage = path.join(localDirectory, image.name)
        await writeFile(localImage, await downloadFile(image.download_url))
        const importName = `image${imageImports.length}`
        imageImports.push({ importName, importPath: toImportPath(localImage) })
        imgsaddr.push(importName)
      }

      records.push({
        id: Number(`${dateDirectory.name}${timeDirectory.name}`),
        date: dateDirectory.name,
        time: timeDirectory.name,
        texts,
        imgsaddr,
      })
    }
  }

  records.sort((a, b) => b.id - a.id)
  const imports = imageImports
    .map(({ importName, importPath }) => `import ${importName} from '${importPath}'`)
    .join('\n')
  const data = JSON.stringify(records, null, 2).replace(/"(image\d+)"/g, '$1')
  await writeFile(path.join(dataRoot, 'personalBlog.ts'), `${imports}\n\nexport default ${data}\n`)
  console.log(`GitHub blogs synced: ${records.length} entries`)
}

async function run() {
  do {
    try {
      await syncBlogs()
    } catch (error) {
      console.error(error)
    }
    if (process.argv.includes('--once')) return
    await new Promise(resolve => setTimeout(resolve, interval))
  } while (true)
}

run()