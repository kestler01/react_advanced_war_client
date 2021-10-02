/* eslint-disable no-tabs */
import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import SignOut from './components/auth/SignOut'
import ChangePassword from './components/auth/ChangePassword'
import GameHall from './components/game/GameHall'
// import GameLobby from './components/game/GameLobby'
import GameInstance from './components/game/GameInstance'
// import CreateGame from './components/game/CreateGame'
// import IndexGames from './components/game/IndexGames.js'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null,
      msgAlerts: [],
      game: null,
      gamePieces: [],
      turn: 0 // add to back end model
    }
  }

  // setGame = (game) => this.setState({ game })

  // expects game to be = {gameDetails}, may need to be game.game if it is= {game:{gameDetails}}
  setTurn = (turn) => this.setState({ turn })

  setGame = (game) => this.setState({ game })

  clearGame = () => this.setState({ game: null })

  setPieces = (pieces) => this.setState({ gamePieces: pieces })

  clearPieces = () => this.setState({ gamePieces: [] })

  setUser = (user) => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  // Alerts from template

  deleteAlert = (id) => {
    this.setState((state) => {
      return { msgAlerts: state.msgAlerts.filter((msg) => msg.id !== id) }
    })
  }

  msgAlert = ({ heading, message, variant }) => {
    const id = uuid()
    this.setState((state) => {
      return {
        msgAlerts: [...state.msgAlerts, { heading, message, variant, id }]
      }
    })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map((msgAlert) => (
          <AutoDismissAlert
            key={msgAlert.id}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
            id={msgAlert.id}
            deleteAlert={this.deleteAlert}
          />
        ))}
        <main className='container'>
          <Route
            exact
            path='/' // home
            render={() => (
              <>
                <h1>Welcome to <a href="https://www.linkedin.com/in/andrew-kestler/" target="_blank" rel="noreferrer">Andrews</a> Advance War Game Site!</h1><p>title pending</p>
                <br></br>
                <p> This is my current in progress passion project and final project for the General Assembly Software Engineering program. </p>
                <p> My goal with this site is to make a game inspired by the classic Advanced Wars games for the Game Boy Advanced from 2001 and 2003. These were some of my brothers favorite games and I hope to share this with them so that we can play together when it is finished. </p>
                <p> I would also love to share it with you! I am still very much in development but feel free to explore the site and check out the repository at <a href="https://github.com/kestler01/react_advanced_war_client" target="_blank" rel="noreferrer"> GitHub. </a> </p>
                <p> Also please dont hesitate to reach out with any questions comments or concerns </p>
                <p>A quick note as you explore: please do NOT use your real email for accessing the site at this time.</p>
              </>
            )}
          />
          <Route
            path='/sign-up'
            render={() => (
              <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
            )}
          />
          <Route
            path='/sign-in'
            render={() => (
              <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
            )}
          />
          <AuthenticatedRoute
            user={user}
            path='/sign-out'
            render={() => (
              <SignOut
                msgAlert={this.msgAlert}
                clearUser={this.clearUser}
                user={user}
              />
            )}
          />
          <AuthenticatedRoute
            user={user}
            path='/change-password'
            render={() => (
              <ChangePassword msgAlert={this.msgAlert} user={user} />
            )}
          />
          <AuthenticatedRoute
            exact
            user={user}
            path='/games/'
            render={() => (
              <>
                <GameHall
                  msgAlert={this.msgAlert}
                  user={user}
                  setGameId={this.setGameId}
                />
                {/* Create and index are now children of the gamehall, redirect to game lobby below */}
              </>
            )}
          />
          <AuthenticatedRoute
            user={user}
            path='/games/:id'
            render={() => (
              <>
                <GameInstance
                  msgAlert={this.msgAlert}
                  user={user}
                  setPieces={this.setPieces}
                  clearPieces={this.clearPieces}
                  setGame={this.setGame}
                  clearGame={this.clearGame}
                  game={this.state.game}
                  gamePieces={this.state.gamePieces}
                  turn={this.state.turn}
                  setTurn={this.setTurn}
                />
              </>
            )}
          />
        </main>
      </Fragment>
    )
  }
}

export default App
