import { getDynamicContent } from '~/functions/dynamic-content'

export default (_context, inject) => {
  inject('dynamic', async (url) => {
    // Call to fauna directly when rendering on server
    return await getDynamicContent({ url, visitedPageBefore: true })
  })
}
