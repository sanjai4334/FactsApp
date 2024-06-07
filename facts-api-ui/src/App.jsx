import { Component } from 'react';
import './App.css';
import ShareButton from './Components/ShareButton';
import CopyButton from './Components/CopyButton';

class App extends Component {
  
  constructor() {
    super();
    this.state = {
      activeCard: 0,
      dpmt: ["it", "chem", "mech", "electrical"],
      currentDpmt: 0,
      cards: [],
      facts: [],
    };
  }

  getFact = async () => {
    let dpmt = this.state.dpmt[this.state.currentDpmt];
    try {
      const response = await fetch(`http://127.0.0.1:8000/get-${dpmt}-fact`);
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

  goToPage = (pageNumber) => {
    this.setState({ activeCard: pageNumber - 1 }, this.loadShow);
  };
  
  changeDpmt = (index) => {
    this.setState({ 
      currentDpmt: index, 
      facts: [],
      activeCard: 0 // Reset the activeCard to 2
    }, () => {
      this.getFact();
      this.getFact();
      this.getFact();
      this.getFact();
      this.getFact();
    });
  };

  render() {
    const { activeCard, dpmt, currentDpmt } = this.state;
    let dpmtTabs = dpmt.map((dept, index) => (
      <button
        key={index}
        className={index === currentDpmt ? "active" : "inactive"}
        onClick={() => this.changeDpmt(index)}
      >
        {dept.toUpperCase()}
      </button>
    ));

    let activeCardIndex = activeCard + 1;

    return (
      <>
        <h1>𝓕𝓐𝓒𝓣𝓢 𝓐𝓟𝓟</h1>
        <div className="tabs">{dpmtTabs}</div>
        <div className="slider">
          {this.state.cards}
          <button id="prev" onClick={() => this.handleClick("prev")}>
            {"<"}
          </button>
          <button id="next" onClick={() => this.handleClick("next")}>
            {">"}
          </button>
        </div>
        <div className="pg-number">
          <button className='two-before' onClick={() => this.goToPage(activeCardIndex - 2)}>
            {activeCardIndex > 2 ? activeCardIndex - 2 : ""}
          </button>
          <button className='one-before' onClick={() => this.goToPage(activeCardIndex - 1)}>
            {activeCardIndex > 1 ? activeCardIndex - 1 : ""}
          </button>
          <button className="current" onClick={() => this.goToPage(activeCardIndex)}>
            {activeCardIndex}
          </button>
          <button className='one-before' onClick={() => this.goToPage(activeCardIndex + 1)}>
            {activeCardIndex + 1}
          </button>
          <button className='two-before' onClick={() => this.goToPage(activeCardIndex + 2)}>
            {activeCardIndex + 2}
          </button>
        </div>
      </>
    );
  }
}

export default App;