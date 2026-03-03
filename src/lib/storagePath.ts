export function extractCvPath(cv_url: string | null): string | null {
    if (!cv_url) return null

    if (!cv_url.startsWith('http')) return cv_url

    const publicMatch = cv_url.match(/\/storage\/v1\/object\/public\/cv-pendaftar\/(.+)$/)
    if (publicMatch?.[1]) return decodeURIComponent(publicMatch[1])

    const signedMatch = cv_url.match(/\/storage\/v1\/object\/sign\/cv-pendaftar\/(.+?)(\?|$)/)
    if (signedMatch?.[1]) return decodeURIComponent(signedMatch[1])

    return null
}