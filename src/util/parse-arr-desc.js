export function parseArrDesc(data) {
  let result = ''

  if (Array.isArray(data)) {
    data.forEach((item) => {
      switch (item.type) {
        case 'paragraph':
          const paragraphText = item.content.map((textItem) => textItem.text).join('')
          result += '\n' + paragraphText + '\n' + '\n'
          break
        case 'bulletList':
          const listItems = item.content.map((listItem) => '- ' + parseArrDesc(listItem.content)).join('\n')
          result += listItems + '\n' + '\n'
          break
        case 'orderedList':
          const orderedItems = item.content.map((listItem, index) => `${index + 1}. ${parseArrDesc(listItem.content)}`).join('\n')
          result += orderedItems + '\n' + '\n'
          break
        case 'heading':
          const headingText = item.content.map((textItem) => textItem.text).join('')
          result += '\n' + headingText + '\n' + '\n'
          break
        default:
          break
      }
    })
  }

  return result
}
