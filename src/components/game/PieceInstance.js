class PieceInstance extends Component {
  constructor (props) {
    super(props)

    this.state = {
      name : null,
      positionX : null,
      positionY : null,
      owner : null
    }
    
    setPiece = ((piece) =>{
      this.setState({ name: piece.name})
      this.setState({ positionX: piece.position_x })
      this.setState({ positionY: piece.position_y })
      this.setState({ owner: piece.owner})
    })
    // expects an object with KVPs of {x:value, y:value} see GameBoard cellArrays
    movePiece = ((coordinateObj) => {
      this.setState({ positionX: coordinateObj.x })
      this.setState({ positionY: coordinateObj.y })    
    })
    
  }