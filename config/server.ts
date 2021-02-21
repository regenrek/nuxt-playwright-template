import { getContext } from '@nuxt/test-utils'

export async function listenToNuxtDocker() {
    const ctx = getContext()

    // Nuxt docker client port is 8080
    const port = 8080

    ctx.url = 'http://localhost:' + port

    // await ctx.nuxt.listen(port)
}

export function url(path: string) {
    const ctx = getContext()

    if (!ctx.url) {
        throw new Error('server is not enabled')
    }

    return ctx.url + path
}
