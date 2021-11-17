
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

  // creates an size * size board | array of arrays, filled with objects with KVP corresponding to their coordinates.
  // exp: size 3 returns =
  // [
  // [{0,0},{1,0},{2,0}],
  // [{0,1},{1,1},{2,1}],
  // [{0,2},{1,2},{2,2}]
  // ]
  createBoard = (size) => {
    const cellArray = []
    // make our row arrays
    for (let y = 0; y < size; y++) {
      cellArray.push([])
      // fill our row arrays with cells
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
      this.setState({ cellArray: this.createBoard(7) }), // will be replaced with pre coded game map from api to support custom terrain details etc.
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
          const pieceData = this.state.gamePieces.find(
            (piece) =>
              piece.position_x === cellData.x && piece.position_y === cellData.y
          )
          let isSelected = this.state.selected.find(
            (cell) => cell?.x === cellData.x && cell?.y === cellData.y
          )
          if (!isSelected) {
            isSelected = false
          }
          //  console.log('IN DRAW GAME CELLS ITERATOR, BEFORE RETURN, LOOKING AT CELL DATA AND PIECE DATA:', cellData, pieceData, this.props)
          //  const gameCellData = { cellData, pieceData }
          //  gameCellData.cellData = cellData
          //  gameCellData.pieceData = pieceData
          return (
            <GameCell
              cellData={cellData}
              pieceData={pieceData}
              key={uuid()}
              setSelected={this.setSelected}
              isSelected={isSelected}
              c
            />
          )
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

  //
  moveSelector (gameCell) {
    // expects the state of the component as an object with appropriate 'layers'
    const movePoints = gameCell.pieceLayer?.movement_points // int
    // const currentX = gameCell.cellLayer.x // int
    // const currentY = gameCell.cellLayer.y // int
    console.log(
      'In toggle move selector function the selected cells movePoints, x , and y:',
      movePoints,
      gameCell.cellLayer.x,
      gameCell.cellLayer.y
    )
    const newSelection = [gameCell.cellLayer] // array of objects corresponding to cell layers data -> [{x:int, y:int}, {x:int, y:int}, ... ]

    /// functions that we will use to add to our newSelection Array, north east south west ///
    // TO DO : add the map tpo the backend, ensure ech cell have a move cost, and is arranged to coordinate with the cell array
    // TO DO : bring this function to GameInstance level, ensure states flow there accordingly
    // TO DO : begin writing other actions for pieces to be triggered below
    // TO DO : add piece selected to the state ? (GameInstance level)
    const North = (movePoints, prevCell) => {
      const up = this.state.cellArray[prevCell.y - 1][prevCell.x] // cellArray is wrapper array, y array , x objects with KVPs of x, y
      // therefore the index of the cell will be it's [y] , [x]. value of that index should be {x:int, y:int}
      // NOTE: 0,0 is top left corner and increase towards the bottom right | 'graph of 4th quadrant'
      const moveCost = up.terrainLayer.moveCost
      if (up && movePoints > moveCost) {
        // if the cell exists and we have enough movement we have a recursive case
        // can add a type check for not moving tanks onto hills etc if supported in backend
        // this data isn't currently stored in the cell array! when we have a pre built map from the api we will make it work.
        this.newSelection.push(up)
        // check cells from this new cell 'up'
        North(movePoints - moveCost, up)
        West(movePoints - moveCost, up)
        East(movePoints - moveCost, up)
        // do not check the cell we just checked from
      } else if (up && (movePoints = moveCost)) {
        // this is the base case/ go back
        this.newSelection.push(up) // is 'this.' necessary to access the above scope of newSelection
      } else {
        console.log('in North, cant move to: up, = ', up)
      }
    }

    // see North function above for comments
    const East = (movePoints, prevCell) => {
      const right = this.state.CellArray[prevCell.y][prevCell.x + 1]
      const moveCost = right.terrainLayer.moveCost
      if (right && movePoints > moveCost) {
        this.newSelection.push(right)
        North(movePoints - moveCost, right)
        East(movePoints - moveCost, right)
        South(movePoints - moveCost, right)
      } else if (right && (movePoints = moveCost)) {
        this.newSelection.push(right)
      } else {
        console.log('in East, cant move to: right, = ', right)
      }
    }

    // see North function above for comments
    const South = (movePoints, prevCell) => {
      const down = this.state.CellArray[prevCell.y][prevCell.x + 1]
      const moveCost = down.terrainLayer.moveCost
      if (down && movePoints > moveCost) {
        this.newSelection.push(down)
        West(movePoints - moveCost, down)
        East(movePoints - moveCost, down)
        South(movePoints - moveCost, down)
      } else if (down && (movePoints = moveCost)) {
        this.newSelection.push(down)
      } else {
        console.log('in West, cant move to: right, = ', down)
      }
    }

    // see North function above for comments
    const West = (movePoints, prevCell) => {
      const left = this.state.CellArray[prevCell.y][prevCell.x + 1]
      const moveCost = left.terrainLayer.moveCost
      if (left && movePoints > moveCost) {
        this.newSelection.push(left)
        North(movePoints - moveCost, left)
        West(movePoints - moveCost, left)
        South(movePoints - moveCost, left)
      } else if (left && (movePoints = moveCost)) {
        this.newSelection.push(left)
      } else {
        console.log('in West, cant move to: right, = ', left)
      }
    }

    // logic checks:

    if (!gameCell.isSelected && gameCell.pieceLayer !== {}) {
      // this cell is not selected and is not empty -> select it
      this.props.setSelected(newSelection)
    } else if (gameCell.isSelected && gameCell.pieceLayer !== {}) {
      // this cell is selected and is not empty -> do an action (like attack or use an ability)
      console.log(
        ' sorry we have not written that action function yet, also you should move this piece before it acts if you want to move it at all'
      )
    } else if (!this.state.isSelected && this.state.pieceLayer !== {}) {
      // this cell is not selected and is not empty -> show player where it can move
      // TO DO : should add has moved and or has acted to piece data to check here.
      // empty cells in range should be blue / selected
      // our recursion block checks for all available moves staring in each cardinal direction - taking into account the pieces movement points AND the movement cost of the cell traveled
      North(movePoints, gameCell.cellLayer)
      East(movePoints, gameCell.cellLayer)
      South(movePoints, gameCell.cellLayer)
      West(movePoints, gameCell.cellLayer)
      console.log(newSelection) // there WILL be duplicates - how do I filter them out ?

      this.props.setSelected(newSelection)
    } else if (this.state.isSelected && this.state.pieceLayer === {}) {
      // api call to update piece and then do an set / update to the 'gamePieces' Array. this will change the props of the game board and re-draw the cells with the pieces having moved
    }

    // if cell is empty and already selected, move ( update database piece location_x and location_y data, then update gamePieces array, then redraw map )
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
