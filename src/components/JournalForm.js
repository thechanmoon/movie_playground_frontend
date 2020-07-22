import React from 'react'
import { API_URL } from '../constants'

const initialState = {
  text: "",
  rating: 1,
  watch_date: ""
}

class JournalForm extends React.Component {
  state = initialState

  componentDidMount()
  {
    this.setState({currentMovie: this.props.currentMovie})
  }

  handleInputChange = event => {
    const inputName = event.target.name
    this.setState({
      [inputName]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    this.fetchCreateMovie();

  }

  fetchCreateMovie()
  {

    console.log(this.state.currentMovie)

    // debugger

    const data = {
      title: this.state.currentMovie.title,
      poster_path: this.state.currentMovie.poster_path,
      overview: this.state.currentMovie.overview,
      tmdb_id: this.state.currentMovie.id,
      // comment: this.state.comment,
      // rating: this.state.rating
    }



    fetch(API_URL + `/movies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(data)
  })
    .then(r => r.json())
    .then(updatedListing => {
      // this.props.handleUpdateListing(updatedListing)
      // this.setState(initialState)
      console.log(updatedListing);
      console.log(updatedListing.id);
      this.fetchCreateJournal(updatedListing.id)
    })
  }

  fetchCreateJournal(id)
  {
   fetch(API_URL + `/movies/${id}/journals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(this.state)
    })
      .then(r => r.json())
      .then(updatedListing => {
        // this.props.handleUpdateListing(updatedListing)
        this.setState(initialState)
        this.props.fetchMovie()
      })
  }

 

  render() {
    // const { text, rating, date } = this.state
    const { text, date } = this.state
    return (
      <div className="form-container-wide">
        <h4>Write a Journal</h4>
        <form onSubmit={this.handleSubmit}>
          {/* <label>Comment:</label> */}
          <textarea name="text" onChange={this.handleInputChange} value={text} />
          <input type="date"  name = "watch_date" onChange={ this.handleInputChange } value={date} />
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default JournalForm