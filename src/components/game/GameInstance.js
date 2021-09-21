import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
// import { Container, Row, Col } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import { getGame, deleteGame } from '../../api/games'
import { updatePiece, indexPieces } from '../../api/pieces'

import { DeleteGameSuccess } from '../AutoDismissAlert/messages'
import GameBoard from './GameBoard'
// app - gameHall - index && create
// ||
// app - lobby - board - cells && pieces **? make them siblings or have cells be the parent of pieces ?

// define a game-board class ( needs state data, pieces, turn, owner.)
class GameInstance extends Component {
  constructor (props) {
    super(props)

    this.state = {
      game: {},
      gamePieces: []
    }
  }

    initialSet = (bigGameObj) => {
      console.log(bigGameObj)
      const { setPieces, setGame } = this.props
      const newGame = bigGameObj.game
      const newGamePieces = bigGameObj.game.game_pieces
      setPieces(newGamePieces)
      setGame(newGame)
      console.log('IN INITIAL SET:GAME =', newGame)
      console.log('IN INITIAL SET:GAMEPIECES =', newGamePieces)
    }

    // does not have a use case atm
    // singular change, builds the new array to set. only expects the new changed piece obj
    // setPiece = (myPiece) => {
    //   // need to pull out a piece. from the gamePieces state object by id, get the index, and splice in the new piece
    //   const targetPiece = this.state.gamePieces.find(
    //     (piece) => piece.id === myPiece.id
    //   )
    //   const targetPieceIndex = this.state.gamePieces.findIndex(targetPiece)
    //   const piecesArray = this.state.gamePieces
    //   const newPiecesArray = piecesArray.splice(targetPieceIndex, 1, myPiece)
    //   this.setState({
    //     game: this.state.game,
    //     gamePieces: newPiecesArray
    //   })
    // }

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
          this.props.setPieces(res)
        })
        .catch((res) => console.log(res))
    }

    componentDidMount () {
      // console.log('this.props.match.params.id', this.props.match.params.id)
      // console.log('state:', this.state)
      // console.log('props:', this.props)
      const { user } = this.props
      // getGame expects a user, and the id, returns an object 'game': { with all the good stuff }
      getGame(user, this.props.match.params.id)
        .then((res) => {
          // console.log('after getGame call:', res)
          return res
        })
        .then((res) => {
          this.initialSet(res.data)
          return (res)
        })
        .then((res) => console.log(res.data))
        .catch((res) => console.log(res))
    }

    DeleteGame () {
    // const { user, msgAlert, history } = this.props
      // console.log('IN DELETE GAME THE PROPS ARE:', this.props)
      const gameId = this.props.game.id
      deleteGame(this.props.user, gameId) // user, gameId
        .then((res) => console.log(res))
        .finally(() =>
          this.props.msgAlert({
            heading: 'Game Deleted',
            message: DeleteGameSuccess,
            variant: 'success'
          })
        )
        .finally(() => this.props.clearGame())
        .finally(() => this.props.clearPieces)
        .finally(() => this.props.history.push('/games/'))
    }

    // to update pieces you must do a **piece patch**, they do NOT live on the game model. any patches to the game will not affect them
    render () {
      console.log('in game instance render props & props.game:', this.props, this.props.game)
      // console.log('IN GAME INSTANCE, AT RENDER. THE game STATE IS:', this.props.game)
      if (!this.props.game) { return (<div> loading</div>) }
      return (

        <>
          < GameBoard {...this.props} />
          <Button onClick={() => { this.DeleteGame(this.props) }}> Delete Game </Button>
        </>
      )
    }
}

export default withRouter(GameInstance)

// define a board cell class ( needs position x , y )

// define a piece class ( needs position, x and y)
