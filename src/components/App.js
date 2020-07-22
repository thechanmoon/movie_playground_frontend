import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom'
import NavBar from './NavBar'
import ListingsContainer from './ListingsContainer';
import ListingPage from './ListingPage';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import JournalList from './JournalList';
import ActorDetail from './ActorDetail';
import { API_URL } from '../constants'
import { connect } from 'react-redux'
// import { createStore, applyMiddleware, compose } from 'redux'
import { compose } from 'redux'
// import thunk from 'redux-thunk'
//import logo from './logo.svg';
//import './App.css';
/*
import { useHistory } from "react-router-dom";
const history = useHistory()
history.push("/login")
*/

class App extends React.Component {
  state = {
    currentUser: null,
    searchTerm: "",
    indexTerm:""
  }

  componentDidMount() {
    document.title = 'Movie Playground'
    fetch(API_URL + "/autologin", {
      mode: 'no-cors',
      credentials: "include"
    })
      .then(r => {
        console.log(r)
        if (!r.ok) {
          throw r
        }
        return r.json()
      })
      .then(user => this.setState({ currentUser: user }))
      .catch(console.error)
  }

  handleUpdateCurrentUser = user => {
    console.log(user)
    this.setState({
      currentUser: user
    })
  }

  handleUpdateSearch = searchTerm => {
    // this.props.history.push(`/listings/search/${encodeURIComponent(searchTerm)}`)
    this.setState({searchTerm: searchTerm})
  }

  handleIndexSelectChange = indexTerm =>{
    this.setState({indexTerm: indexTerm})
  } 

  render() {
    console.log("In app", this.state)

    return( 
    <>
      Movie app
      <NavBar
        handleUpdateCurrentUser={this.handleUpdateCurrentUser}
        handleUpdateSearch={this.handleUpdateSearch}
        handleIndexSelectChange={this.handleIndexSelectChange}
        currentUser={this.state.currentUser}
      />
      <main>
        <Switch>
          <Route exact path="/" render={() => <h1>Home</h1>} />
          <Route path="/login" render={routeProps => <LoginForm {...routeProps} handleUpdateCurrentUser={this.handleUpdateCurrentUser} />} />
          <Route path="/signup" render={routeProps => <SignupForm {...routeProps} handleUpdateCurrentUser={this.handleUpdateCurrentUser} />} />
          {this.state.currentUser && (
            <>
              <Route path="/listings/:id" render={routeProps => <ListingPage {...routeProps} />} />
              <Route path="/journals" render={routeProps => <JournalList {...routeProps} />} />
              <Route path="/actors/:id" render={routeProps => <ActorDetail  {...routeProps} />} />
              <Route exact path="/listings" render={routeProps => <ListingsContainer {...routeProps} searchTerm={this.state.searchTerm} indexTerm={this.state.indexTerm}/>} />
            </>
          )}
        </Switch>
      </main>
    </>
    )
  }
}


// mapStateToProps = returns whatever props we want added to our component
const mapStateToProps = state => {
  console.log("mSP", state)
  return {
    counter: state.counter,
    paused: state.paused,
    likedNumbers: state.likedNumbers,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    someFunc: () => dispatch({ type: "WHATEVER" }),
    // updateComment: (text) => dispatch({ type: "UPDATE_COMMENT", payload: text }),
    // togglePause: () => dispatch({ type: "TOGGLE_PAUSE" }),
    // increment: () => dispatch({ type: "INCREMENT" }),
    // decrement: () => dispatch({ type: "DECREMENT" }),
    // addComment: () => dispatch({ type: "ADD_COMMENT" }),
    // likeNumber: () => dispatch({ type: "LIKE_NUMBER" }),
  }
}

// export default withRouter(App);
export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(App);

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
