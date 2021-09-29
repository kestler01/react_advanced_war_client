// need to write CRUD pieces calls
import apiUrl from '../apiConfig'
import axios from 'axios'

// piece routes
// create a piece (expects name, and it's positions)
export const createPiece = (user, pieceData, gameId) => {
  // user is coming from the state of the app component
  return axios({
    method: 'POST',
    url: apiUrl + `/games/${gameId}/pieces/`,
    headers: {
      Authorization: `Token ${user.token}`
    },
    data: {
      piece: {
        name: pieceData.name,
        position_x: pieceData.position_x,
        position_y: pieceData.position_y
      }
    }
  })
}

// get all users pieces ( will need another to get ALL open pieces(not started?), V2+)
export const indexPieces = (user, gameId) => {
  return axios({
    url: apiUrl + `/games/${gameId}/pieces/`,
    method: 'GET',
    headers: {
      Authorization: `Token ${user.token}`
    }
  })
}
// get one piece / detail view
export const getPiece = (user, gameId, pieceId) => {
  return axios({
    url: apiUrl + `/games/${gameId}/pieces/${pieceId}/`,
    method: 'GET',
    headers: {
      Authorization: `Token ${user.token}`
    }
  })
}
// patch the piece, it IS a PARTIAL update. For now will only update the position
export const updatePiece = (user, gameId, pieceId, pieceData) => {
  return axios({
    url: apiUrl + `/games/${gameId}/pieces/${pieceId}/`,
    method: 'PATCH',
    headers: {
      Authorization: `Token ${user.token}`
    },
    data: {
      piece: {
        position_x: pieceData.position_x,
        position_y: pieceData.position_y
      }
    }
  })
}

// delete piece
export const deletePiece = (user, gameId, pieceId) => {
  return axios({
    url: apiUrl + `/games/${gameId}/pieces/${pieceId}/`,
    method: 'DELETE',
    headers: {
      Authorization: `Token ${user.token}`
    }
  })
}
