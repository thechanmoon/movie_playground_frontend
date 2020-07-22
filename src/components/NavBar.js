import React from 'react'
import { Link } from 'react-router-dom'
import { API_URL } from '../constants'

class NavBar extends React.Component {
  state = {
    searchTerm: "",
    indexTerm: "popular"
  }

  handleLogout = () => {
    fetch(API_URL + "/logout", {
      method: "POST",
      credentials: "include"
    })
      .then(r => r.json())
      .then(() => {
        this.props.handleUpdateCurrentUser(null)
      })
  }

  handleChange = event => {
    this.setState({ searchTerm: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.handleUpdateSearch(this.state.searchTerm)
    this.setState({searchTerm:''})
    // debugger
  }

  handleIndexSelectChange = event =>{
    console.log(event.target.value);
    this.setState({ indexTerm: event.target.value })
    this.props.handleIndexSelectChange(event.target.value);
  }

  render() {
    return (
      <header>
        <Link to="/listings">
          <div className="logo" />
        </Link>

        <div className="logo-playground" />
        
        <Link to="/Journals">
          <button>Journals</button>
        </Link>

        <select name = 'indexSelect' onChange = {this.handleIndexSelectChange}>
          <option value="popular">popular</option>
          <option value="upcoming">upcoming</option>
          <option value="now_playing">now_playing</option>
          <option value="top_rated">top_rated</option>
        </select>

        <form className="search" onSubmit={this.handleSubmit}>
          <input type="text" name = 'searchInput' placeholder="Search movies..." value={this.state.searchTerm} onChange={this.handleChange} />
          {/* <input type="submit" value="Search" /> */}
          {/* <button style = {{margin:"20px"}} className = "btn btn-primary">Search</button> */}
          <button className = "btn btn-primary">Search</button>
        </form>
        <div className="actions">
          {this.props.currentUser ? (
            <button onClick={this.handleLogout}>Logout {this.props.currentUser.username}</button>
          ) : (
              <>
                <Link to="/login">
                  <button>Login</button>
                </Link>
                <Link to="/signup">
                  <button>Sign Up</button>
                </Link>
              </>
            )}
        </div>
      </header>
    )
  }
}

export default NavBar