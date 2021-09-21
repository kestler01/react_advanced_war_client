
import { Container, Row, Col } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import React, { Component } from 'react'
import { v4 as uuid } from 'uuid'

class GameBoard extends Component {
  constructor (props) {
    super(props)

    this.state = { cellArray: [] }
  }

  // creates an array of arrays, filled with objects with KVP corresponding to their coordinates.
  // exp: size 3 returns =
  // [[{0,0},{1,0},{2,0}],
  // [{0,1},{1,1},{2,1}],
  // [{0,2},{1,2},{2,2}]]

  createBoard = (size) => {
    const cellArray = []
    for (let y = 0; y < size; y++) {
      cellArray.push([])
      for (let x = 0; x < size; x++) {
        cellArray[y].push({ x: x, y: y })
      }
    }
    return cellArray
  }

  componentDidMount () { // return here may not be necessary
    return (this.setState({ cellArray: this.createBoard(7) }))
  }

  // returns html / jsx row and col with x and y coordinates
  drawCells = (cellArray) => {
    // console.log('cellArray:', cellArray)
    // console.log('this.state:', this.state)
    console.log('this.props:', this.props)
    // const boardJSX = []
    const board = cellArray.map((rowArray) => {
      // console.log('ROW ARRAY NOTE:', rowArray)

      const row = rowArray.map((cell) => (
        <Col key={uuid()} className='border border-dark'>
          {' '}
          {cell.x}, {cell.y}{' '}
        </Col>
      )
      )
      // console.log('BOARDJSX:', boardJSX)

      // console.log('row:', row)
      return (<Row key={uuid()}> {row} </Row>)
    })
    // console.log('BOARD?', board)
    return (
      <Container>

        <Row><span>{this.props.game.name}</span></Row>
        <Row>{board}</Row>
      </Container>
    )
  }

  // key={board.row.indexOf(cell)}{ board.indexOf(row)} potential key for the cells
  render () {
    // console.log('state in game board.js render:', this.state)
    if (this.state.cellArray.length === 0) {
      return <div>loading</div>
    } else {
      return this.drawCells(this.state.cellArray)
    }
    // return (
    //   <container>
    //     <Row>
    //       <Col className='border border-dark'>0,0</Col>
    //       <Col className='border border-dark'>1,0</Col>
    //       <Col className='border border-dark'>2,0</Col>
    //       <Col className='border border-dark'>3,0</Col>
    //       <Col className='border border-dark'>4,0</Col>
    //     </Row>
    //     <Row>
    //       <Col className='border border-dark'>0,1</Col>
    //       <Col className='border border-dark'>1,1</Col>
    //       <Col className='border border-dark'>2,1</Col>
    //       <Col className='border border-dark'>3,1</Col>
    //       <Col className='border border-dark'>4,1</Col>
    //     </Row>
    //     <Row>
    //       <Col className='border border-dark'>0,2</Col>
    //       <Col className='border border-dark'>1,2</Col>
    //       <Col className='border border-dark'>2,2</Col>
    //       <Col className='border border-dark'>3,2</Col>
    //       <Col className='border border-dark'>4,2</Col>
    //     </Row>
    //     <Row>
    //       <Col className='border border-dark'>0,3</Col>
    //       <Col className='border border-dark'>1,3</Col>
    //       <Col className='border border-dark'>2,3</Col>
    //       <Col className='border border-dark'>3,3</Col>
    //       <Col className='border border-dark'>4,3</Col>
    //     </Row>
    //     <Row>
    //       <Col className='border border-dark'>0,4</Col>
    //       <Col className='border border-dark'>1,4</Col>
    //       <Col className='border border-dark'>2,4</Col>
    //       <Col className='border border-dark'>3,4</Col>
    //       <Col className='border border-dark'>4,4</Col>
    //     </Row>
    //   </container>
    // )
  }
}

export default withRouter(GameBoard)

// className=" border border-dark"
// const GameHall = (props) => {
//   return (
//     <Container>
//       <Row>
//         <span>Welcome to the Advance War Game Hall</span>
//       </Row>
//       <Row>
//         <Col>{CreateGame(props)}</Col>
//         <Col>{IndexGames(props)}</Col>
//       </Row>
//     </Container>
//   )
// }

// class BoardCell extends Component {
//   constructor (props) {
//     super(props)

//     this.state = {}
//   }

//   return {
//     <Col> {props.x}, {props.y} </Col>
//   }
// }
