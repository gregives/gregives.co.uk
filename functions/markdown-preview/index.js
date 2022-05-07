import markdown from '~/config/markdown'

export async function handler(event) {
  const body = JSON.parse(event.body)
  const response = await markdown(body, true)

  return {
    statusCode: 200,
    body: JSON.stringify(response)
  }
}
