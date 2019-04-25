import { isPhabricator, isPublicCodeHost } from '../../context'

export const DEFAULT_SOURCEGRAPH_URL = 'https://sourcegraph.com'

export let sourcegraphUrl =
    window.localStorage.getItem('SOURCEGRAPH_URL') || window.SOURCEGRAPH_URL || DEFAULT_SOURCEGRAPH_URL

interface UrlCache {
    [key: string]: string
}

export const repoUrlCache: UrlCache = {}

if (window.SG_ENV === 'EXTENSION' && globalThis.browser) {
    // tslint:disable-next-line: no-floating-promises TODO just get rid of the global sourcegraphUrl
    import(/* webpackMode: "eager" */ '../../browser/storage')
        .then(({ storage }) => storage.sync.get())
        .then(items => {
            if (items.sourcegraphURL) {
                sourcegraphUrl = items.sourcegraphURL
            }
        })
}

export function setSourcegraphUrl(url: string): void {
    sourcegraphUrl = url
}

export function isSourcegraphDotCom(url: string = sourcegraphUrl): boolean {
    return url === DEFAULT_SOURCEGRAPH_URL
}

export function getPlatformName(): 'phabricator-integration' | 'firefox-extension' | 'chrome-extension' {
    if (window.SOURCEGRAPH_PHABRICATOR_EXTENSION) {
        return 'phabricator-integration'
    }

    return isFirefoxExtension() ? 'firefox-extension' : 'chrome-extension'
}

export function getExtensionVersion(): string {
    // Content scripts don't have access to the manifest, but do have chrome.app.getDetails
    const c = globalThis.chrome as any
    if (c && c.app && c.app.getDetails) {
        const details = c.app.getDetails()
        if (details && details.version) {
            return details.version
        }
    }

    if (globalThis.browser && browser.runtime && browser.runtime.getManifest) {
        const manifest = browser.runtime.getManifest() // TODO can getManifest() return undefined?
        return manifest.version
    }

    return 'NO_VERSION'
}

function isFirefoxExtension(): boolean {
    return window.navigator.userAgent.indexOf('Firefox') !== -1
}

/**
 * Check the DOM to see if we can determine if a repository is private or public.
 */
export function isPrivateRepository(): boolean {
    if (isPhabricator) {
        return true
    }
    if (!isPublicCodeHost) {
        return true
    }
    // @TODO(lguychard) this is github-specific and should not be in /shared
    const header = document.querySelector('.repohead-details-container')
    if (!header) {
        return false
    }
    return !!header.querySelector('.private')
}
