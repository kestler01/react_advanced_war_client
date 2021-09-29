import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'
import { indexGames } from '../../api/games'

// import { v4 as uuid } from 'uuid'
// index Games

// App < GameHall <indexgames & creategame
// @^ index and create are siblings, not parent child.
class IndexGames extends Component {
  constructor (props) {
    super(props)

    this.state = {
      games: []
    }
  }
  // I expect state to look like this:
  // games:[{
  //    id: 14,
  //    name: 'DK',
  //    is_over: false,
  //    is_started: false,
  //    owner: 4,
  //    turn: 0,
  //    created_at:...,
  //    updated_at:...,
  //  },
  //  {
  //    'another games data'
  //  }, ...
  //  ]

  setGamesIndex = (games) => this.setState(games)

  componentDidMount () {
    const { user } = this.props
    // indexGames expects a user, returns an object 'games': with an array of game objects
    indexGames(user)
      .then((res) => {
        console.log('INDEX games call:', res)
        return res
      })
      .then((res) => this.setGamesIndex(res.data))
      .catch((res) => console.log(res))
  }

  // will add player # logic here in later versions, also refresh button to redo the call ?

  render () {
    const openGames = this.state.games.filter((game) => game.is_started === false)

    const drawGameListEntry = (game) => (
      <ListGroup.Item
        key={game.id}
        // disabled // grayed out and no hover- will be implemented later
        action // enables hover goodness
        variant='dark' // makes it dark
        // link={ `/games/${game.id}/`} // href go to other sites, must use Links
      >
        <Link className='btn' role='button' to={`/games/${game.id}/`}>
          {game.name} - {game.id}
        </Link>
      </ListGroup.Item>
    )
    // currently getting a minor/tiny error about the way this link path works
    // tiny-warning.esm.js:11 Warning: You are attempting to use a basename on a page whose URL path does not begin with the basename. Expected path "/games/14/" to begin with "/react_advanced_war_client". then redirects to home and signs user out. / refresh ?
    // put a link around each ListGroup item?

    // each entry is a link to the game detail page, add the component and url, this new component is where the game should be in the state with it's pieces etc. but also not be started- lobby view

    const gameList = openGames.map(drawGameListEntry)

    return (
      <><span>coming in V2.0, see your games, and in V3, join another game !</span>
        <ListGroup>
          {gameList}
        </ListGroup>
      </>
    )
  }
}

export default withRouter(IndexGames)
