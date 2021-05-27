import logo from './logo.svg';
import './App.css';



function App() {
  
  /*componentDidMount() {
    this.fetchProducts();
  }


  async fetchProduct() {
    const response = await fetch('http://localhost:4000/nordstrom?top=3&keyword=red dresses')
    const json = await response.json();
    console.log(json);
  }
  */

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

