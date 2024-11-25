export const getCharAtFirstWord = word => word && word.charAt(0).toUpperCase()
export const getCharAtSecondWord = word => word && word.split(' ')[1]?.charAt(0).toUpperCase()
export const charAtText = word => (getCharAtSecondWord(word) ? getCharAtFirstWord(word) + getCharAtSecondWord(word) : getCharAtFirstWord(word))
