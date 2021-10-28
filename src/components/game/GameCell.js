import { Col } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import React, { Component } from 'react'
import { v4 as uuid } from 'uuid'

// piece object looks like:
// {
// attack_range: 1
// base_attack: 60
// base_defense: 0
// can_cap: true
// game: 24
// hit_points: 100
// id: 1
// movement_points: 2
// name: 'marine'
// owner: 2
// position_x: 2
// position_y: 1
// unit_type: 'test'
// }

class GameCell extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cellLayer: null,
      buildingLayer: {},
      pieceLayer: {},
      isSelected: false
    }
  }

  // const pieceData = this.state.gamePieces.find((piece) => ((piece.position_x === cellData.x) && (piece.position_y === cellData.y)))

  componentDidMount () {
    return (
      this.setState({ cellLayer: this.props.cellData }),
      this.setState({ pieceLayer: this.props.pieceData }),
      this.setState({ isSelected: this.props.isSelected })
    )
  }

  ComponentDidUpdate (prevProps) {
    // Typical usage (don't forget to compare props):
    // user, game, gamePieces
    console.log('in Component did update at GameCell,prevProps:', prevProps)
    console.log('in Component did update at GameCell,this.props:', this.props)
    console.log('in Component did update at GameCell,this.state:', this.state)
    if (this.props.pieceData !== prevProps.pieceLayer) {
      this.setState({ pieceLayer: this.props.pieceData })
    }
  }

  moveSelector () {
    const movePoints = this.state.pieceLayer?.movement_points // int
    const currentX = this.state.cellLayer.x // int
    const currentY = this.state.cellLayer.y // int
    console.log(
      'In toggle move selector function looking at state based vars:',
      movePoints,
      currentX,
      currentY
    )
    const newSelection = [this.state.cellLayer] // array of objects corresponding to cell layers data -> {x:int, y:int}
    // for (let i = 1; i <= movePoints; i++) {
    // }
    // add new cell objects to the newSelection array and then use the props setSelected function to send them to the gameBoard state
    // logic checks:

    if ((this.state.pieceLayer !== {}) && (!this.state.isSelected)) {
      // this cell should not be empty- if empty and not already selected we setSelected
      this.props.setSelected(newSelection)
    } else if ((this.state.isSelected) && (this.state.pieceLayer !== {})) {
      // this cell should not already be selected, otherwise we want to do an action.
      console.log(
        ' sorry we have not written that action function yet, also you should move this piece before it acts if you want to move it at all'
      )
    } else if ((!this.state.isSelected) && (this.state.pieceLayer !== {})) {
      // this cell should highlight to show which unit player has selected
      // empty cells in range should be blue / selected
      // to make sure you cant move over the distance through walls etc, the check should go by square and check its neighbors- looping, to simulate pathing
      // ! we dont have access to other pieces positions at this level...
      const x = currentX // make sure this is a value and not a reference
      const y = currentY
      let currentPoints = movePoints
      while (currentPoints > 0) {
        currentPoints -= 1
      }
      // empty cells not in move range but inside action range at end of move range should be outlined? ( other highlight )
      // cells occupied by friendly units should not be highlighted, but also should not block 'path'
      // cells with units not owned by player in range should be highlighted with red for attack actions (should also include action range )

      // if cell is empty and already selected, move ( update database piece location_x and location_y data, then update gamePieces array, then redraw map )
      // if cell is occupied by a unit not owned by player and already selected. . . hmmmmm look at how wargroove does it- you move first and then do attack goodness. - looks like i want to write an action selector for this.

      this.props.setSelected(newSelection)
    }
  }

  render () {
    if (this.state.cellLayer === null) {
      return 'loading...'
    } else {
      const cellLayer = this.state.cellLayer
      const pieceLayer = this.state.pieceLayer
      const selectorColor = this.state.pieceLayer
        ? ('background: rgb(255,255,255) background: radial-gradient(circle, rgba(255,255,255,0) 36%, rgba(54,198,73,1) 100%)')
        : ('background: rgb(255,255,255) background: radial-gradient(circle, rgba(255,255,255,0) 36%, rgba(54,192,198,1) 100%)')
      // console.log(
      //   ' I am in the render of the GAmeCEll, the state is:',
      //   this.state
      // )
      if (!this.state.isSelected) {
        return (
          <Col
            key={uuid()}
            className='border border-dark gameCell'
            style={{ height: '120px', backgroundColor: 'gray' }}
            data-x={cellLayer.x}
            data-y={cellLayer.y}
            onClick={() => {
              this.props.setSelected(this.props.cellData)
            }}>
            {pieceLayer?.name}
          </Col>
        )
      } else {
        return (
          <Col
            key={uuid()}
            className='border border-dark gameCell'
            style={{ height: '120px', selectorColor }}
            data-x={cellLayer.x}
            data-y={cellLayer.y}
            onClick={() => {
              this.props.setSelected() // this will have to be changed to execute an update function
            }}>
            {pieceLayer?.name}
          </Col>
        )
      }
    }
  }
}

export default withRouter(GameCell)
