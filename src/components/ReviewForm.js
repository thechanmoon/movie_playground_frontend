import React from 'react'
import { API_URL } from '../constants'

const initialState = {
  comment: "",
  rating: 1,
  currentMovie: {}
}

class ReviewForm extends React.Component {
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

    // fetch(API_URL + `/listings/${this.props.listingId}/reviews`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   credentials: "include",
    //   body: JSON.stringify(this.state)
    // })
    //   .then(r => r.json())
    //   .then(updatedListing => {
    //     this.props.handleUpdateListing(updatedListing)
    //     this.setState(initialState)
    //   })

    this.fetchCreateMovie()

  }

  fetchCreateMovie()
  {

    console.log(this.state.currentMovie)

    debugger

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
      this.fetchCreateReview(updatedListing.id)
    })
  }

  fetchCreateReview(id)
  {
   fetch(API_URL + `/movies/${id}/reviews`, {
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
        // this.setState(initialState)
        this.props.fetchMovie()
      })
  }

  render() {
    const { comment, rating } = this.state
    return (
      <div className="form-container-wide">
        <h4>Leave a Review</h4>
        <form onSubmit={this.handleSubmit}>
          {/* <label>Comment:</label> */}
          <textarea name="comment" onChange={this.handleInputChange} value={comment} />
          <label>Rating:</label>
          <select name="rating" onChange={this.handleInputChange} value={rating} >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            
          </select>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default ReviewForm