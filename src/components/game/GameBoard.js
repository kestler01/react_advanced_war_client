
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

  // expects an array of gameCells to be 'selected' , must add to props for on conditional on click on game cell. Also must pass setSelected as a prop!
  setSelected = (cells) => {
    this.setState({ selected: [cells] })
  }

  componentDidMount () {
    // return here may not be necessary
    return (
      this.setState({ cellArray: this.createBoard(7) }),
      this.setState({ gamePieces: this.props.gamePieces })
    )
  }

  // currently inuse to have the board redraw when props change- i.e. have the newly selected game cells or new pieces, made by child components update the state of the game instance.
  UNSAFE_componentWillReceiveProps (nextProps) {
    this.setState({
      gamePieces: nextProps.gamePieces
    })
  }

 drawGameCells = (cellArray) => {
   console.log(
     'In draw gme cells when trying to select this.state.selected:',
     this.state.selected
   )
   const cellLayer = cellArray.map((rowArray) => {
     // console.log('ROW ARRAY NOTE:', rowArray)

     const row = rowArray.map(
       (cell) => {
         const cellData = cell
         const pieceData = this.state.gamePieces.find((piece) => ((piece.position_x === cellData.x) && (piece.position_y === cellData.y)))
         let isSelected = this.state.selected.find((cell) => ((cell?.x === cellData.x) && (cell?.y === cellData.y)))
         if (!isSelected) { isSelected = false }
         //  console.log('IN DRAW GAME CELLS ITERATOR, BEFORE RETURN, LOOKING AT CELL DATA AND PIECE DATA:', cellData, pieceData, this.props)
         //  const gameCellData = { cellData, pieceData }
         //  gameCellData.cellData = cellData
         //  gameCellData.pieceData = pieceData
         return <GameCell cellData={cellData} pieceData={pieceData} key={uuid()} setSelected={this.setSelected} isSelected={isSelected}c/>
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
   if (this.state.cellArray.length === 0) {
     return <div>loading</div>
   } else {
     return this.drawGameCells(this.state.cellArray)
   }
 }
}

export default withRouter(GameBoard)
