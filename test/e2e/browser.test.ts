import { setupTest, shot, getBrowser, createPage } from '../../config'
import { describe, test, expect, xtest } from '@jest/globals'

const getPageTitle = (title: string) => {
  const postfixTitle = ''
  return title + postfixTitle
}

describe('/ (Home Page)', () => {
  setupTest({waitFor: 200})

  test('should render page', async () => {
    const page = await createPage('/')
    const body = await page.innerHTML('body')
    expect(body).toContain('Hello world')

    const title = await page.title()
    expect(title).toBe('My awesome website')
    
    // create a screenshot
    await shot('frontpage', page);
  })

  test('should render page without cookies', async () => {
    const page = await createPage('/', { disableDefaultCookies: true })
    const body = await page.innerHTML('body')
    expect(body).toContain('Hello world')

    const title = await page.title()
    expect(title).toBe('My awesome website')

    await shot('frontpage_wo_cookies', page);
  })
})