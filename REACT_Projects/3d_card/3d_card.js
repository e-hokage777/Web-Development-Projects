class Card extends React.Component {
  constructor(props) {
    super(props);
    console.log(this);
    this.state = {
      title: props.title,
      color: props.color,
      rotX: 0,
      rotY: 0,
    };
    this.rect = null;
  }


  handleClick = () => {
    this.setState({color: "red" });
  };

  handleMouseMove = (event) => {
    let x = (event.clientX - this.rect.left) / this.rect.width;
    let y = (event.clientY - this.rect.top) / this.rect.height;
    x = x - 0.5;
    y = 0.5-y;
    let angle = 60;

    this.setState({rotX: angle * x, rotY: angle * y });
  };

  handleMouseOut = ()=>{
    this.setState(
      {...this.state, rotX: 0, rotY: 0}
    );
  }

  componentDidMount(){
    this.rect = document.getElementById("hover-card").getBoundingClientRect();
  }


  render() {
    return (
      <div
        style={{
          transform: `rotateX(${this.state.rotY}deg) rotateY(${this.state.rotX}deg)`,
          transition: "all 0.15s"
        }}
        id="hover-card"
        onMouseMove={this.handleMouseMove}
        onMouseOut={this.handleMouseOut}
        className="card"
      >
        <div onClick={this.handleClick} className="card-photo">
          <img src="images/719602.png" />
        </div>
        <div
          style={{
            color: this.state.color,
          }}
          className="card-title"
        >
          {this.state.title}
        </div>
      </div>
    );
  }
}


const main = ReactDOM.createRoot(root);
main.render(<Card title="Hover Over" color="white" />);
