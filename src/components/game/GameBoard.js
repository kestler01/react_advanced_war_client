
import { Container, Row, Col } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import React, { Component } from 'react'
import { v4 as uuid } from 'uuid'
// import $ from 'jquery'
// import PieceInstance from './PieceInstance'
import GameCell from './GameCell'

/// //////////////////////////////////////////////////////  Gameboard  ////////////////////////////////////////////////////////

class GameBoard extends Component {
  constructor (props) {
    super(props)

    this.state = {
      cellArray: [],
      gamePieces: [],
      selected: []
    }
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

  componentDidMount () {
    // return here may not be necessary
    return (
      this.setState({ cellArray: this.createBoard(7) }),
      this.setState({ gamePieces: this.props.gamePieces })
    )
  }
  // not triggering on GameInstance state or props change
  // ComponentDidUpdate (prevProps) {
  //   // Typical usage (don't forget to compare props):
  //   // user, game, gamePieces
  //   console.log('in Component did update at GameBOARD,prevProps:', prevProps)
  //   console.log('in Component did update at GameBOARD,this.props:', this.props)
  //   console.log('in Component did update at GameBOARD,this.state:', this.state)
  //   if (this.props.gamePieces !== prevProps.gamePieces) {
  //     this.setState({ pieceArray: this.props.gamePieces })
  //   }
  // }

  UNSAFE_componentWillReceiveProps (nextProps) {
    this.setState({
      gamePieces: nextProps.gamePieces
    })
  }

  // OLD DRAW MAP, NO PIECE SUPPORT
  // returns html / jsx row and col with x and y coordinates
  // drawMapCells = (cellArray) => {
  // console.log('cellArray:', cellArray)
  // console.log('this.state:', this.state)
  // console.log('this.props:', this.props)
  // const boardJSX = []
  // const gamePieces = this.props.gamePieces uneccessary here
  //   // console.log('in draw cell array funciton, gamepieces array from props is:', gamePieces)
  //   const boardLayer = cellArray.map((rowArray) => {
  //     // console.log('ROW ARRAY NOTE:', rowArray)

  //     const row = rowArray.map((cell) => (
  //       <Col
  //         key={uuid()}
  //         className='border border-dark'
  //         style={{ height: '120px', backgroundColor: 'gray' }}
  //         data-x={cell.x}
  //         data-y={cell.y}></Col>
  //     ))
  //     // console.log('row:', row)
  //     return <Row key={uuid()}> {row} </Row>
  //   })
  //   // console.log('BOARD?', board)
  //   return (
  //     <Container>
  //       <Row>
  //         <Col>{this.props.game.name}</Col>
  //         <Col>TURN:{this.props.turn}</Col>
  //       </Row>
  //       {/* {this.drawPieceCells(this.state.cellArray)} */}
  //       <Row position='absolute'>{boardLayer}</Row>
  //     </Container>
  //   )
  // }
  // JQUERY TRYING TO TARGET THE MAP CELLS AND DRAW THEM IN, NOT SURE HOW TO USE IN RENDER METHOD
  // colorCells = () => {
  //   this.state.gamePieces.forEach((piece) => {
  //     const pieceX = piece.position_x
  //     const pieceY = piece.position_y
  //     $(`Col data-x=${pieceX} data-y=${pieceY}`).backgroundColor = 'Green'
  //   })
  // }

  // WIP ALTERNATIVE TO DRAW MAPCELLS, USING THE GAME CELL COMPONENT ABOVE
 drawGameCells = (cellArray) => {
   //  console.log('cellArray:', cellArray)
   //  console.log('cellArrayFlat', cellArray.flat())
   // console.log('this.state:', this.state)
   // console.log('this.props:', this.props)
   // const boardJSX = []
   // const gamePieces = this.props.gamePieces uneccessary here
   // console.log('in draw cell array funciton, gamepieces array from props is:', gamePieces)
   const cellLayer = cellArray.map((rowArray) => {
     // console.log('ROW ARRAY NOTE:', rowArray)

     const row = rowArray.map(
       (cell) => {
         const cellData = cell
         const pieceData = this.state.gamePieces.find((piece) => ((piece.position_x === cellData.x) && (piece.position_y === cellData.y)))
         //  console.log('IN DRAW GAME CELLS ITERATOR, BEFORE RETURN, LOOKING AT CELL DATA AND PIECE DATA:', cellData, pieceData, this.props)
         //  const gameCellData = { cellData, pieceData }
         //  gameCellData.cellData = cellData
         //  gameCellData.pieceData = pieceData
         return <GameCell cellData={cellData} pieceData={pieceData} key={uuid()} />
       }
       //  < GameBoard {...this.props} />
     )
     //  console.log('row:', row)
     return (
       <Row position='absolute' key={uuid()}>
         {' '}
         {row}{' '}
       </Row>
     )
   })
   //  console.log('cellLayer', cellLayer)
   return (
     <Container>
       <Row>
         <Col>{this.props.game.name}</Col>
         <Col>TURN:{this.props.turn}</Col>
       </Row>
       {/* {this.drawPieceCells(this.state.cellArray)} */}
       <Row position='absolute'>{cellLayer}</Row>
     </Container>
   )
 }

 render () {
   // console.log('state in game board.js render:', this.state)
   if (this.state.cellArray.length === 0) {
     return <div>loading</div>
   } else {
     return this.drawGameCells(this.state.cellArray)
   }
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
