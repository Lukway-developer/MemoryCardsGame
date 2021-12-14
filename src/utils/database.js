import { database } from './firebase'
import { ref, set, get, update, child} from 'firebase/database'
const dbRef = ref(database)

const getNickname = async ( uid ) => {
  let nickname

  await get(child(dbRef, `users/${uid}/nickname`))
    .then(snapshot => {
      nickname = snapshot.val()
    })
    .catch(error => console.log(error))

  return nickname
}

const saveNickname = async ( nickname, uid ) => {
  const nicknameRef = ref(database, `users/${uid}/`)
  const lisOfNicknamesRef = ref(database, 'nicknames/')

  let listOfNicknames = []

  // Get all nicknames
  await get(child(dbRef, 'nicknames/'))
    .then(snapshot => {
      snapshot.forEach(child => {
        listOfNicknames.push(child.val().toLowerCase())
      })
    })
    .catch(error => console.log(error))

  if(listOfNicknames.includes(nickname.toLowerCase())) {
    throw (Error('Nombre no disponible'))
  } else {
    // Set index to Nicknames database
    const index = listOfNicknames.length
    const nicknameUpdate = {}

    nicknameUpdate[index] = nickname

    // Save user nickname
    update(nicknameRef, {
      nickname
    })
    // Update nicknames list
    update(lisOfNicknamesRef, nicknameUpdate)
  }
}

const saveEmail = (email, uid) => {
  const userRef = ref(database, `users/${uid}/`)
  set(userRef, { email })
}

const getRanking = async (category, level) => {
  const dbRef = ref(database)
  const ranking = []

  // onValue(rankingRef, (snapshot) => {
  //   snapshot.forEach(child => {
  //     ranking.push(child.val())
  //   })
  // }, {
  //   onlyOnce: true
  // })

  await get(child(dbRef, `ranking/${category}/${level}`))
    .then(snapshot => {
      snapshot.forEach(child => {
        ranking.push(child.val())
      })
    })
    .catch(error => console.log(error))

  return ranking
}

const updateRanking = (ranking, data, category, level) => {
  const rankingRef = ref(database, `ranking/${category}/${level}`)

  ranking.unshift(data)

  ranking.sort((a, b) => {
    if(!a.errors) return 1
    if(!b.errors) return -1

    if(a.errors < b.errors) return -1

    if(a.errors === b.errors){
      if(a.time < b.time) return -1

      if(a.time === b.time) return 0

      if(a.time > b.time) return 1
    }

    if(a.errors > b.errors) return 1
  })

  ranking.forEach((item, index) => item.position = index + 1)

  const newRanking = ranking.map(item => Object.assign({}, item))

  newRanking.pop()

  update(rankingRef, {
    ...newRanking
  })
}

export {
  getNickname,
  saveNickname,
  saveEmail,
  getRanking,
  updateRanking
}