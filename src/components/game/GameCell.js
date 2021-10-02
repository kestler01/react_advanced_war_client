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

  componentDidMount () {
    return (
      this.setState({ cellLayer: this.props.cellData }),
      this.setState({ pieceLayer: this.props.pieceData })
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
    console.log('isSelected ?:', this.state.isSelected)
    this.setState({ isSelected: !this.state.isSelected })
  }

  render () {
    if (this.state.cellLayer === null) {
      return 'loading...'
    } else {
      const cellLayer = this.state.cellLayer
      const pieceLayer = this.state.pieceLayer
      const selectorColor = this.state.pieceLayer ? 'green' : 'blue'
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
            style={{ height: '120px', backgroundColor: selectorColor }}
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
