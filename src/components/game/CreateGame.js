import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { createGame } from './../../api/games'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { createGameSuccess, createGameFailure } from '../AutoDismissAlert/messages'

// App < GameHall <indexgames & creategame < gamelobby < ingameview
// @^ index and create are siblings, not parent child.

// create Game
class CreateGame extends Component {
  constructor (props) {
    super(props)

    this.state = {
      name: ''
    }
  }

  // will need to export game:{ name: 'value'} => see gameData
  // for our form updates, not locking out
  handleChange = (event) =>
    this.setState({
      [event.target.name]: event.target.value
    })

  onCreateGame = (event) => {
    event.preventDefault()

    const { msgAlert, history, user } = this.props // from app level
    // createGame expects 'user, gameData' where gameData: is an object with a name
    // attribute to be accessed as => gameData.name
    const gameDataName = this.state
    // let createdGame

    createGame(user, gameDataName)
      .then((res) => {
        console.log(res)
        return (res)
      })
      .then((res) => {
        msgAlert({
          heading: 'Create Game Success',
          message: createGameSuccess,
          variant: 'success'
        })
        return (res)
      }
      )
      .then((res) => history.push(`/games/${res.data.game.id}/ `)) // will go to the new games view
    // automatically.
      .catch((error) => {
        this.setState({ email: '', password: '' })
        msgAlert({
          heading: 'Create Game Failed with error: ' + error.message,
          message: createGameFailure,
          variant: 'danger'
        })
      })
  }

  // add a render method with the form!
  render () {
    const { name } = this.state

    return (
      <div className='row'>
        <div className='col-sm-10 col-md-8 mx-auto mt-5'>
          <h3>Create a new Game</h3>
          <Form onSubmit={this.onCreateGame}>
            <Form.Group controlId='name'>
              <Form.Label>New Game Name</Form.Label>
              <Form.Control
                required
                type='string'
                name='name'
                value={name}
                placeholder=' new game '
                onChange={this.handleChange}
              />
            </Form.Group>
            {/* <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                name='password'
                value={password}
                type='password'
                placeholder='Password'
                onChange={this.handleChange}
              />
            </Form.Group> */}
            <Button variant='primary' type='submit'>
              Create
            </Button>
          </Form>
        </div>
      </div>
    )
  }
  // then implement the game lobby view with state goodness.
}

export default withRouter(CreateGame)
