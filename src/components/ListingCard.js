import React from 'react'
import { IMAGE_URL } from '../constants'
class ListingCard extends React.Component {

  state = {
    favorite: true
  }




  toggleFavorite = () => {
    // arrow fn
    // const implicit = () => ({ key: "value" })
    // const explicit = () => {
    //   return { key: "value" }
    // }

    // this is best practice if your next state depends on prev state
    this.setState(prevState => ({
      favorite: !prevState.favorite
    }))

    // this will generally work
    // this.setState({ favorite: !this.state.favorite })
  }

  sliceTitle = (string) =>
  {
    return (string.length <19 ? string : `${string.slice(0,18)}...`)
  }


  render() {
    // destructuring the props object (we could also do the destructuring directly to the argument of the ListingCard fn)
    // const { image, name, city, rating, price } = this.props
    const { id, poster_path, title } = this.props.listing.table
    // poster_path = "https://image.tmdb.org/t/p/w300"+poster_path;
    let image = IMAGE_URL + poster_path;
    // console.log(this.props.listing.poster_path);
    return (
      <div className="card" onClick={() => this.props.showDetail(id)}>
        <div className="image" style={{ backgroundImage: `url(${image})` }}>
          {/* <button onClick={this.toggleFavorite} className="favorite">
            <span role="img" aria-label="heart">{this.state.favorite ? "♥️" : "♡"}</span>
          </button> */}
        </div>
        {/* <div className="info">
          <span>{city}</span>
          <span>★ {rating}</span>
        </div> */}
        <div  className="info">
        <h4 className="title">{this.sliceTitle(title)}</h4>
        </div>
        {/* <div className="price">
          <strong>${price}</strong>/month
        </div> */}
      </div>

      // <div className="card">
      //   <div className="image" style={{ backgroundImage: `url(${image})` }}>
      //     <button onClick={this.toggleFavorite} className="favorite">
      //       <span role="img" aria-label="heart">{this.state.favorite ? "♥️" : "♡"}</span>
      //     </button>
      //   </div>
      //   <div className="info">
      //     <span>{city}</span>
      //     <span>★ {rating}</span>
      //   </div>
      //   <h4 className="title">{name}</h4>
      //   <div className="price">
      //     <strong>${price}</strong>/month
      //   </div>
      // </div>
    )
  }
}

export default ListingCard