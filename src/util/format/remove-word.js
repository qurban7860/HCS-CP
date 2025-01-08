export function removeWord(str, wordToRemove) {
 const regex = new RegExp(wordToRemove, 'gi')
 return str.replace(regex, '')
}
