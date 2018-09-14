import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Axios from 'axios';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: '',
      allname:[]
    };
    this.handleClick = this.handleClick.bind(this);

  }
  componentDidMount(){
    this.getAllUsers();
  }
  async getAllUsers() {
    try{
      const getResponse = await Axios.get(`http://localhost:3001/users`);
      console.log(getResponse);
      this.setState({allname: getResponse.data.users});
    }
    catch(error){
      console.log(error);
    }
  }
  async handleClick()  {
    console.log(this.state.user);
    if(this.state.user !== ''){
      var userObj = {
        name: this.state.user
      };
      try{
        const response = await Axios.post(`http://localhost:3001/users`, userObj);
        console.log(response);
      }
      catch(error){
        console.log(error);
      }
      this.getAllUsers();
      

    }

  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React, Again!!!!</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <input type="text" value={this.state.user} onChange={(e) => this.setState({user:e.target.value})} />
        <button onClick={this.handleClick} > Submit </button>
        <div className="theList1">
        Available user
          <ol className="theList">
                {this.state.allname.map(function(user, index){
                    return <li key={ index}>{user.name}</li>;
                  })}
          </ol>
        </div>
        
      </div>
    );
  }
}

export default App;
