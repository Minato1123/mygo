import { promises as fs } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ASSETS_DIR = path.join(__dirname, '../public')

type AssetType = {
  title: string
  path: string
  tags: string[]
  anime: string
}

/**
 * 遞迴掃描目錄，篩選出 PNG 檔案
 */
const tagsRegex = /__(.*)\.png$/
async function scanDirectory(dir: string): Promise<AssetType[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const result: AssetType[] = []

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    const relativePath = path.relative(ASSETS_DIR, fullPath)
    const parts = relativePath.split(path.sep)

    if (entry.isDirectory()) {
      result.push(...(await scanDirectory(fullPath)))
    } else if (entry.isFile() && entry.name.endsWith('.png')) {
      if (parts.length >= 3) {
        const title = entry.name.split('__')[0]
        const match = entry.name.match(tagsRegex)
        const tags = match ? match[1].split("_") : []
        const anime = parts[0]

        result.push({
          title,
          tags,
          anime,
          path: relativePath
        })
      }
    }
  }

  return result
}

/**
 * 主函式
 */
async function main() {
  try {
    const pngFiles = await scanDirectory(ASSETS_DIR)
    const outputPath = path.join(__dirname, '../data/assets_list.json')

    await fs.writeFile(outputPath, JSON.stringify(pngFiles, null, 2), 'utf-8')
    console.log(`JSON 已儲存至 ${outputPath}`)
  } catch (error) {
    console.error("發生錯誤：", error)
  }
}

main()
