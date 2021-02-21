import { createContext, setContext, NuxtTestOptions } from '@nuxt/test-utils'
import { listenToNuxtDocker } from './server'
import { createBrowser } from './browser'

export function setupTest(options: Partial<NuxtTestOptions>) {
  const ctx = createContext(options)

  beforeEach(() => {
    setContext(ctx)
  })

  afterEach(() => {
    setContext(undefined)
  })

  afterAll(async () => {
    if (ctx.browser) {
      await ctx.browser.close()
    }
  })

  test(
    'setup nuxt',
    async () => {

      await listenToNuxtDocker()

      if (ctx.options.waitFor) {
        await new Promise(resolve => setTimeout(resolve, ctx.options.waitFor))
      }

      if (ctx.options.browser) {
        await createBrowser()
      }
    },
    ctx.options.setupTimeout
  )
}

export function spyOnClass(instance: any) {
  const proto = Object.getPrototypeOf(instance)
  for (const key of Object.getOwnPropertyNames(proto)) {
    jest.spyOn(instance, key)
  }
}
