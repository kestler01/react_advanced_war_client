import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
// writing html and jsx to organize my Create And Index components on the page
import CreateGame from './CreateGame'
import IndexGames from './IndexGames'

// App < GameHall <indexgames & creategame < gamelobby < ingameview
//  || parallel
// App < GameLobby

// pass the PROPS!
const GameHall = (props) => {
  return (
    <Container>
      <Row>
        <span>Welcome to the Advance War Game Hall</span>
      </Row>
      <Row>
        <Col>{CreateGame(props)}</Col>
        <Col>{IndexGames(props)}</Col>
      </Row>
    </Container>
  )
}

export default withRouter(GameHall)

// const Header = ({ user }) => ( // USES IMPLICIT RETURN!?
// <Navbar bg='primary' variant='dark' expand='md'>
//   <Navbar.Brand>
//     <Link to='/' style={{ color: '#FFF', textDecoration: 'none' }}>
//       Advance War{' '}
//     </Link>
//   </Navbar.Brand>
//   <Navbar.Toggle aria-controls='basic-navbar-nav' />
//   <Navbar.Collapse id='basic-navbar-nav'>
//     <Nav className='ml-auto'>
//       {user && (
//         <span className='navbar-text mr-2'>Welcome, {user.email}</span>
//       )}
//       {alwaysOptions}
//       {user ? authenticatedOptions : unauthenticatedOptions}
//     </Nav>
//   </Navbar.Collapse>
// </Navbar>
// )
