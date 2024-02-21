import { Component } from 'react'
import './App.css'
import ShareButton from './Components/ShareButton';
import CopyButton from './Components/CopyButton';

class App extends Component {
  
  constructor() {
    super();
    this.state = {
      fact: "Press the 'Get Fact' button to get a random Engineeing fact!",
    };
  }

  getFact = async () => {
    try {
      const reponse = await fetch("http://127.0.0.1:8000/get-fact");
      const jsonData = await reponse.json();

      this.setState({
        fact: jsonData.fact,
      });

    } catch (error) {
      console.log(`Error Fetching data: ${error}`);
    }
  }
  
  render = () => (
    <>
      <div>
        <h1>Engineering Facts</h1>

        <div  className='text-box'>
          <p>{this.state.fact}</p>
        </div>

        <div className="flex-container">
          <button onClick={() => this.getFact()}>Get Fact</button>
          <ShareButton title="Engineering Facts" text={"Random Engineering Fact :\n" + this.state.fact} />
          <CopyButton text={"Random Engineering Fact :\n" + this.state.fact} />
        </div>
      </div>
    </>
  )
}

export default App
