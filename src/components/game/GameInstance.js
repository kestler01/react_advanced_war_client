import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
// import { Container, Row, Col } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import { getGame, deleteGame, updateGame } from '../../api/games'
import { updatePiece, indexPieces, createPiece } from '../../api/pieces'

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
      const { setPieces, setGame, setTurn } = this.props
      const newGame = bigGameObj.game
      const newGamePieces = bigGameObj.game.game_pieces
      setPieces(newGamePieces)
      setGame(newGame)
      setTurn(newGame.turn)
      console.log('IN INITIAL SET:GAME =', newGame)
      console.log('IN INITIAL SET:GAMEPIECES =', newGamePieces)
    }

    CreatNewPiece (piece) {
      const { user, game, gamePieces, setPieces } = this.props
      const piecesArray = gamePieces
      createPiece(user, piece, game.id)
        .then((res) => {
          console.log('IN CREATE NEW PIECE, the response from api is:', res)
          return (res.data)
        })
        .then((data) => {
          piecesArray.push(data.piece)
          setPieces(piecesArray)
        })
    }

    updatePiece (piece) {
      const { user } = this.props
      const gameId = this.state.game.id
      // updatePiece expects : user, gameId, pieceId, pieceData, returns 204, no body
      updatePiece(user, gameId, piece.id, piece) // api call
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
          console.log('after getGame call:', res)
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
        .finally(() => this.props.setTurn(null))
        .finally(() => this.props.clearPieces)
        .finally(() => this.props.history.push('/games/'))
    }

    // patch the game, it IS a PARTIAL update, can accept a new name(str), is_over(bool), is_started(bool), and turn(int).
    // WILL NOT AFFECT PIECES
    // updateGame = (user, id, gameData)
    // sends empty response
    EndTurn () {
      const gameId = this.props.game.id
      const updatedGameData = this.props.game
      updatedGameData.turn += 1
      updateGame(this.props.user, gameId, updatedGameData)
        .then(() => {
          this.props.setGame(updatedGameData)
          this.props.setTurn(updatedGameData.turn)
        })
        .catch((res) => console.log('something went wrong', res))
      // this.props.setTurn(this.props.turn + 1)
    }
    //       piece: {
    //     name: pieceData.name,
    //     position_x: pieceData.position_x,
    //     position_y: pieceData.position_y

    // to update pieces you must do a **piece patch**, they do NOT live on the game model. any patches to the game will not affect them
    render () {
      console.log('in game instance render props & props.game:', this.props, this.props.game)
      const demoPiece = { name: 'marine', position_x: 2, position_y: 2 }
      // console.log('IN GAME INSTANCE, AT RENDER. THE game STATE IS:', this.props.game)
      if (!this.props.game) { return (<div> loading</div>) }
      return (

        <>
          < GameBoard {...this.props} />
          <Button onClick={() => { this.DeleteGame(this.props) }}> Delete Game </Button>
          <Button onClick={() => { this.EndTurn(this.props) }}> EndTurn </Button>
          <Button onClick={() => { this.CreatNewPiece(demoPiece) }}> NewPiece </Button>
        </>
      )
    }
}

export default withRouter(GameInstance)

// define a board cell class ( needs position x , y )

// define a piece class ( needs position, x and y)
