/**
 * Post-build prerendering script
 * Renders each route with Puppeteer and saves the HTML for AI crawlers.
 *
 * Usage: node scripts/prerender.mjs
 * Runs automatically via `npm run build` postbuild step.
 *
 * If Puppeteer is unavailable (e.g. CI without Chrome), the script
 * exits gracefully and the SPA still works normally.
 */

import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'
import { createServer } from 'http'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.join(__dirname, '..', 'dist')

const routes = [
  '/',
  '/blog',
  '/blog/ki-agenten-baubranche-2025',
  '/blog/whatsapp-automatisierung-bauunternehmen',
  '/blog/baustellen-dokumentenmanagement-ki',
  '/blog/ai-agents-construction-dach',
  '/blog/ki-implementierung-kleine-unternehmen',
  '/privacy',
  '/terms',
]

async function serve() {
  const handler = (req, res) => {
    let filePath = path.join(distDir, req.url === '/' ? 'index.html' : req.url)

    // SPA fallback: if no file found, serve index.html
    if (!fs.existsSync(filePath)) {
      // Try adding .html
      if (fs.existsSync(filePath + '.html')) {
        filePath = filePath + '.html'
      } else if (fs.existsSync(path.join(filePath, 'index.html'))) {
        filePath = path.join(filePath, 'index.html')
      } else {
        filePath = path.join(distDir, 'index.html')
      }
    }

    // If it's a directory, serve index.html from it
    if (fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, 'index.html')
      if (!fs.existsSync(filePath)) {
        filePath = path.join(distDir, 'index.html')
      }
    }

    const ext = path.extname(filePath)
    const mimeTypes = {
      '.html': 'text/html',
      '.js': 'application/javascript',
      '.css': 'text/css',
      '.json': 'application/json',
      '.png': 'image/png',
      '.svg': 'image/svg+xml',
      '.ico': 'image/x-icon',
    }

    const contentType = mimeTypes[ext] || 'application/octet-stream'
    const content = fs.readFileSync(filePath)
    res.writeHead(200, { 'Content-Type': contentType })
    res.end(content)
  }

  const server = createServer(handler)
  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => {
      const port = server.address().port
      resolve({ server, port })
    })
  })
}

async function prerender() {
  let puppeteer
  try {
    puppeteer = await import('puppeteer')
  } catch {
    console.log('[prerender] Puppeteer not available, skipping prerendering.')
    console.log('[prerender] The SPA will still work normally without prerendered HTML.')
    return
  }

  const { server, port } = await serve()
  console.log(`[prerender] Static server running on port ${port}`)

  let browser
  try {
    browser = await puppeteer.default.launch({ headless: true })
    const page = await browser.newPage()

    for (const route of routes) {
      const url = `http://127.0.0.1:${port}${route}`
      console.log(`[prerender] Rendering ${route}...`)

      await page.goto(url, { waitUntil: 'networkidle0', timeout: 15000 })
      // Wait a bit for React to fully render
      await page.waitForSelector('#root *', { timeout: 10000 })

      const html = await page.content()

      // Write to dist/[route]/index.html
      const outputPath = route === '/'
        ? path.join(distDir, 'index.html')
        : path.join(distDir, route, 'index.html')

      const outputDir = path.dirname(outputPath)
      fs.mkdirSync(outputDir, { recursive: true })
      fs.writeFileSync(outputPath, html)
      console.log(`[prerender]   -> ${path.relative(distDir, outputPath)}`)
    }

    console.log(`[prerender] All ${routes.length} routes prerendered successfully!`)
  } catch (err) {
    console.error('[prerender] Error during prerendering:', err.message)
    console.log('[prerender] Continuing without prerendering. SPA will still work.')
  } finally {
    if (browser) await browser.close()
    server.close()
  }
}

prerender()
