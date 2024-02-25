import { Component } from 'react'
import './App.css'
import ShareButton from './Components/ShareButton';
import CopyButton from './Components/CopyButton';

class App extends Component {
  
  constructor() {
    super();
    this.state = {
      activeCard: 2,
      cards: [],
      facts: [],
    };
  }

  getFact = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/get-fact");
      const jsonData = await response.json();

      this.setState(
        (prevState) => ({
          facts: [...prevState.facts, jsonData.fact],
        }),
        this.loadShow
      );
    } catch (error) {
      console.log(`Error Fetching data: ${error}`);
    }
  };

  componentDidMount() {
    this.getFact();
    this.getFact();
    this.getFact();
  }

  loadShow = () => {
    const { activeCard, facts } = this.state;

    this.setState({
      cards: facts.map((text, index) => {
        const distance = Math.abs(index - activeCard);
        const position = index - activeCard;

        return (
          <div
            key={index}
            className="card"
            style={{
              transform: `translateX(${position * 50}%) scale(${
                index === activeCard ? 1 : 0.8
              }) perspective(16px) rotateY(${
                index === activeCard ? 0 : index < activeCard ? 1 : -1
              }deg)`,
              filter: index === activeCard ? "none" : "blur(5px)",
              opacity: index === activeCard ? 1 : distance > 2 ? 0 : 0.6,
              zIndex: index === activeCard ? 1 : 0,
            }}
          >
            {text}
            <div className="button-container">
              <ShareButton text={text} />
              <CopyButton text={text} />
            </div>
          </div>
        );
      }),
    });
  };

  handleClick = (moveDirection) => {
    const { activeCard } = this.state;
    if (moveDirection === "next" && activeCard < this.state.cards.length - 1) {
      this.setState({ activeCard: activeCard + 1 }, () => {
        this.state.activeCard === this.state.cards.length - 2
          ? this.getFact()
          : this.loadShow();
      });
    } else if (moveDirection === "prev" && activeCard > 0) {
      this.setState({ activeCard: activeCard - 1 }, this.loadShow);
    }
  };

  render() {
    return (
      <>
          <div className="slider">
            {this.state.cards}

              <button id="prev" onClick={() => this.handleClick("prev")}>
                {"<"}
              </button>
              <button id="next" onClick={() => this.handleClick("next")}>
                {">"}
              </button>
          </div>
      </>
    );
  }
}

export default App
