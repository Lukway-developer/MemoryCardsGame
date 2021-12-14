const setupCards = (category, level, images) => {
  const pairsOfCards = setPairsOfCards(level)
  const cardImages = setCardImages(images, pairsOfCards)

  return cardImages
}

const setPairsOfCards = (level) => {
  let pairs

  switch (level) {
  case 'easy':
    pairs = 6
    break

  case 'normal':
    pairs = 8
    break

  case 'hard':
    pairs = 10
    break

  default:
    pairs = 8 - 1
    break
  }

  return pairs
}

const setCardImages = (images, number) => {
  // Unflip validation
  images.map(image => image.flip = false)

  const randomImages = images.sort(() => Math.random() - 0.5)
  randomImages.splice(number)
  const copyRandomImages = randomImages.map(item => Object.assign({}, item))

  const pairsOfImages = [...randomImages, ...copyRandomImages]

  // Add ID
  for (let i = 0; i < pairsOfImages.length; i++) {
    pairsOfImages[i].id = i
  }
  pairsOfImages.sort(() => Math.random() - 0.5)
  pairsOfImages.sort(() => Math.random() - 0.5)

  return pairsOfImages
}

export default setupCards