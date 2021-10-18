import { Col } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import React, { Component } from 'react'
import { v4 as uuid } from 'uuid'

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

  ToggleSelected () {
    this.setState({ isSelected: !this.state.isSelected })
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
              this.ToggleSelected()
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
              this.ToggleSelected()
            }}>
            {pieceLayer?.name}
          </Col>
        )
      }
    }
  }
}

export default withRouter(GameCell)
