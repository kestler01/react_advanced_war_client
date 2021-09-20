import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { getGame } from '../../api/games'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
// import ListGroup from 'react-bootstrap/ListGroup'

// complete implementation in V2.0 !

// component relationship structure:

// app - gameHall- index && create
// ||
// app - lobby

// Game lobby
class GameLobby extends Component {
  constructor (props) {
    super(props)

    this.state = {
      game: {}
    }
  }

  // after call state should look like- this.state:
  //  {game: {
  //    created_at: "2021-09-19T21:08:44.360109"
  //    game_pieces: []
  //    id: 31
  //    is_over: false
  //    is_started: false
  //    name: "ak new game"
  //    owner: "any@email.me"
  //    turn: 0
  //    updated_at: "2021-09-19T21:08:44.360126"
  //    __proto__: Object
  //    __proto__: Object
  //  }}

  setGame = (game) => this.setState(game)

  // props.match.params.id

  componentDidMount () {
    console.log('this.props.match.params.id', this.props.match.params.id)
    console.log('state:', this.state)
    console.log('props:', this.props)
    const { user } = this.props
    // indexGames expects a user, returns an object 'game': { with all the good stuff }
    getGame(user, this.props.match.params.id)
      .then((res) => {
        console.log('after getGame call:', res)
        return res
      })
      .then((res) => this.setGame(res.data))
      .catch((res) => console.log(res))
  }

  // the api call :
  // export const getGame = (user, id) => {
  // return axios({
  //   url: apiUrl + `/games/${id}/`,
  //   method: 'GET',
  //   headers: {
  //     Authorization: `Token ${user.token}`
  //   }
  // })

  // game lobby should have column of players like the list in index games and a field with game info goodness

  render () {
    // destructure out the game details from the state
    const { turn, name, owner, id } = this.state.game
    // const { user } = this.props
    console.log('in render, state is :', this.state)
    // console.log('in render, user is :', user)

    const gameDetails = { turn: turn, name: name, owner: owner, id: id }
    console.log(gameDetails)
    // a draw callback method to make list items for each of the game details

    const drawGameDetailsListEntry = (key, value) => {
      // need to be refactored to accept a key and put out the key name and the value and the list will have to be refactored into an object(from an array)
      return (
        <ListGroup.Item>
          {key}: {value}
        </ListGroup.Item>
      )
    }

    function generateGameDetailsList (myObject) {
      let detailList
      for (const [key, value] of Object.entries(myObject)) {
        drawGameDetailsListEntry(key, value)
        console.log(drawGameDetailsListEntry(key, value))
      }
      console.log(detailList)
      return detailList
    }

    const gameDetailsList = generateGameDetailsList(gameDetails)

    console.log(gameDetailsList)
    return (
      <>
In Game Lobby. Game Details:
        <ListGroup>{gameDetailsList}</ListGroup>
        <Button
          style={{ width: '100px', textDecoration: 'none' }}
          variant='success'
          size='lg'>
Start Game
        </Button>
        <Button
          style={{ width: '100px', textDecoration: 'none' }}
          variant='danger'
          size='lg'>
Leave Game
        </Button>
      </>
    )
  }
}

export default withRouter(GameLobby)

// current error
// Error: Objects are not valid as a React child (found: object with keys {game}). If you meant to render a collection of children, use an array instead.
