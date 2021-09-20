import apiUrl from '../apiConfig'
import axios from 'axios'

// game routes
// create a game (expects name, rest is defaulted)
export const createGame = (user, gameDataName) => { // user is coming from the state of the app component
  return axios({
    method: 'POST',
    url: apiUrl + '/games/',
    headers: {
      Authorization: `Token ${user.token}`
    },
    data: {
      game: {
        name: gameDataName.name
      }
    }
  })
}

// get all users games ( will need another to get ALL open games(not started?), V2+)
export const indexGames = (user) => {
  return axios({
    url: apiUrl + '/games/',
    method: 'GET',
    headers: {
      Authorization: `Token ${user.token}`
    }
  })
}
// get one game / detail view
export const getGame = (user, id) => {
  return axios({
    url: apiUrl + `/games/${id}/`,
    method: 'GET',
    headers: {
      Authorization: `Token ${user.token}`
    }
  })
}
// patch the game, it IS a PARTIAL update, can accept a new name(str), is_over(bool), is_started(bool), and turn(int).
// WILL NOT AFFECT PIECES
export const updateGame = (user, id, gameData) => {
  return axios({
    url: apiUrl + `/games/${id}`,
    method: 'PATCH',
    headers: {
      Authorization: `Token ${user.token}`
    },
    data: { gameData }
  })
}

// delete game
export const deleteGame = (user, id) => {
  return axios({
    url: apiUrl + `/games/${id}/`,
    method: 'DELETE',
    headers: {
      Authorization: `Token ${user.token}`
    }
  })
}
