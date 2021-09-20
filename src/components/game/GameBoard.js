import React, { Component } from 'react'
// import { Container, Row, Col } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import { getGame } from '../../api/games'
import { updatePiece, indexPieces } from '../../api/pieces'
// app - gameHall - index && create
// ||
// app - lobby - board - cells && pieces **? make them siblings or have cells be the parent of pieces ?

// define a game-board class ( needs state data, pieces, turn, owner.)
class GameBoard extends Component {
  constructor (props) {
    super(props)

    this.state = {
      game: {},
      gamePieces: []
    }
  }

  initialSet = (bigGameObj) => {
    const game = bigGameObj.game
    const gamePieces = bigGameObj.game.game_pieces
    this.setState({
      game: game,
      gamePieces: gamePieces
    })
  }

  // expects game to be = {gameDetails}, may need to be game.game if it is= {game:{gameDetails}}
  setGame = (game) =>
    this.setState({
      game: game.game,
      gamePieces: this.state.gamePieces
    })

  // when you have multiple changes or the array already built.
  setPieces = (pieces) =>
    this.setState({
      game: this.state.game,
      gamePieces: pieces.game_pieces
    })

  // singular change, builds the new array to set. only expects the new changed piece obj
  setPiece = (myPiece) => {
    // need to pull out a piece. from the gamePieces state object by id, get the index, and splice in the new piece
    const targetPiece = this.state.gamePieces.find(
      (piece) => piece.id === myPiece.id
    )
    const targetPieceIndex = this.state.gamePieces.findIndex(targetPiece)
    const piecesArray = this.state.gamePieces
    const newPiecesArray = piecesArray.splice(targetPieceIndex, 1, myPiece)
    this.setState({
      game: this.state.game,
      gamePieces: newPiecesArray
    })
  }

  updatePiece (piece) {
    const { user } = this.props
    const gameId = this.state.game.id
    // updatePiece expects : user, gameId, pieceId, pieceData, returns 204, no body
    updatePiece(user, gameId, piece.id, piece)
    // index Pieces expects : (user, gameId)
    // returns {game_pieces:[ array of pieces as {KVPs},{KVPs}] }
      .then(() => indexPieces(user, gameId))
      .then((res) => {
        console.log(res)
        this.setPieces(res)
      })
      .catch((res) => console.log(res))
  }

  componentDidMount () {
    console.log('this.props.match.params.id', this.props.match.params.id)
    console.log('state:', this.state)
    console.log('props:', this.props)
    const { user } = this.props
    // getGame expects a user, and the id, returns an object 'game': { with all the good stuff }
    getGame(user, this.props.match.params.id)
      .then((res) => {
        console.log('after getGame call:', res)
        return res
      })
      .then((res) => this.initialSet(res.data))
      .catch((res) => console.log(res))
  }
  // to update pieces you must do a **piece patch**, they do NOT live on the game model. any patches to the game will not affect them

  

}

export default withRouter(GameBoard)

// define a board cell class ( needs position x , y )

// define a piece class ( needs position, x and y)
