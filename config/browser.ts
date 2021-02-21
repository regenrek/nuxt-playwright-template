import type { Browser, BrowserContextOptions } from 'playwright'
import { getContext } from '@nuxt/test-utils'
import { url } from './server'
import { resolve } from 'path'
import fs from 'fs'

export type BrowserContextOptionsAdv = BrowserContextOptions & {
    /**
     * Whether to automatically download all the attachments. Defaults to `false` where all the downloads are canceled.
     */
    disableDefaultCookies?: boolean;
}

const loadCookiesMock = () => {
    const dir = resolve(__dirname, '../test/testdata/cookiesDummy.json')
    const cookies = fs.readFileSync(dir, 'utf8')
    return JSON.parse(cookies)
}

export async function createBrowser() {
    const ctx = getContext()

    let playwright
    try {
        playwright = require('playwright')
    } catch {
        /* istanbul ignore next */
        throw new Error(`
      The dependency 'playwright' not found.
      Please run 'yarn add --dev playwright' or 'npm install --save-dev playwright'
    `)
    }

    const { type, launch } = ctx.options.browserOptions

    if (!playwright[type]) {
        throw new Error(`Invalid browser '${type}'`)
    }

    //const firefoxBrowser = await playwright['firefox'].launch({ headless: false, slowMo: 50 })
    ctx.browser = await playwright[type].launch(launch)
}

export async function getBrowser(): Promise<Browser> {
    const ctx = getContext()
    if (!ctx.browser) {
        await createBrowser()
    }
    return ctx.browser
}

export async function createPage(
    path?: string,
    options?: BrowserContextOptionsAdv
) {
    const browser = await getBrowser()
    let page = null

    if (!options?.disableDefaultCookies) {
        const context = await browser.newContext()
        const cookies = loadCookiesMock()
        await context.addCookies(cookies)
        page = await context.newPage()
    } else {
        page = await browser.newPage(options)
    }

    if (path) {
        await page.goto(url(path))
    }

    return page
}

export async function shot(name: string, page:any) {
    return await page.screenshot({ path: `screenshots/${name}.png`, fullPage: false });
}
