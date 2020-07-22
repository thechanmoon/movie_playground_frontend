import React from 'react'
import LoadingSpinner from './LoadingSpinner'
import JournalForm from './JournalForm'
import Journal from './Journal'
// import ReviewForm from './ReviewForm'
import Review from './Review'
import { API_URL, IMAGE_URL } from '../constants'
import ReactPlayer from 'react-player';

class ListingPage extends React.Component {

  state = {
    listing: null,
    loaded: false,
    reviews: [],
    video_url: '',
    currentMovie: {}
  }

  componentDidMount() {
   this.fetchMovie()
  }

  fetchMovie = () =>
  {
    console.log('ListingPage componentDidMount');
    fetch(API_URL + `/apis/${this.props.match.params.id}`, {
    // fetch(API_URL + `/apis/${tmdb_id}`, {
      credentials: "include"
    })
      .then(r => r.json())
      .then(listing => {
        console.log(listing)


        // this.setState({video_url: 'https://www.youtube.com/watch?v=1FgHYjtymQY' }) 
        //this.setState({video_url: 'https://www.youtube.com/watch?v=Z6Lt8umAStg'})
        // this.setState({video_url: 'https://www.youtube.com/watch?v=4RI0QvaGoiI&list=PL20cj4jGpvsBAEnT7BfBwZmLwEzlwZTYa&index=2' }) // notting hill
        // https://www.youtube.com/watch?v=0diCvgWv_ng // once upon a time in america
        // https://www.youtube.com/watch?v=1FgHYjtymQY // // once upon a time in america full movie
        // https://www.youtube.com/watch?v=Z6Lt8umAStg// conspiracy

        // console.log(listing.reviews)

        // listing.reviews = {...listing.reviews, ...listing.extra}

        // for(let i = 0; listing.reviews &&  i < listing.reviews.length; i++)
        // {
        //   // let newObj =  {...listing.reviews[i], ...listing.extra[i]}
        //   // console.log(newObj)
        //   // listing.reviews[i] = newObj;
        //   listing.reviews[i] = {...listing.reviews[i], ...listing.extra[i]}
        // }


        console.log(listing.reviews)

        this.setState({
          listing: listing,
          loaded: true,
          video_url: listing.movie.table.videos && listing.movie.table.videos.length>0?'https://www.youtube.com/watch?v='+listing.movie.table.videos[0] : '',
          reviews: listing.reviews,
          currentMovie: listing.movie.table
        })
        console.log(listing);    
        console.log(listing.id);       
        // this.fetchSearchReviews(listing.id);        
      })
  }

  fetchSearchReviews = movie_id =>
  {
    console.log(movie_id);
    let url = API_URL + `/movies/${movie_id}/reviews/search`
    console.log(url)
    fetch(url, {
      credentials: "include"
    })
      .then(r => r.json())
      .then(reviews => {
        console.log(reviews)
        this.setState({
          reviews: reviews,
          loaded: true
        })
      })
  }

  handleUpdateListing = listing => {
    this.setState({ listing })
  }

  toggleFavorite = () => {

    if (!this.state.listing.favorite) {
      fetch(API_URL + `/listings/${this.state.listing.id}/favorites`, {
        method: "POST",
        credentials: "include"
      })
        .then(r => r.json())
        .then(listing => this.setState({ listing }))
    } else {
      fetch(API_URL + `/listings/${this.state.listing.id}/favorites/remove`, {
        method: "DELETE",
        credentials: "include"
      })
        .then(r => r.json())
        .then(listing => this.setState({ listing }))
    }
  }


  render() {
    console.log(this.props)
    console.log(this.state)
    if (!this.state.loaded) {
      return <LoadingSpinner />
    }

    const { id, poster_path, title, overview, release_date, runtime, vote_average, revenue, genres, casts} = this.state.listing.movie.table;
    const reviews = this.state.listing.reviews
    const journals = this.state.listing.journals
    console.log(this.state.listing)
    console.log(this.state.listing.reviews)
    console.log(reviews)
    let image = IMAGE_URL + poster_path;
    // console.log(video_url)
    return (
      <div className="detail">
        <div className='container'>
          <div className="detail-info">
            <div className="image" style={{ backgroundImage: `url(${image})` }}>
              {/* <button onClick={this.toggleFavorite} className="favorite">
                <span role="img" aria-label="heart">{favorite ? "♥️" : "♡"}</span>
              </button> */}
            </div>
            <div>
            <h2> Genre: </h2>
              <ul className="casts">
                {/* {genres.map((genre, index) => <li key={index}>{genre.table.name}</li>)} */}
                {genres}
              </ul>

              <h2>Casts: </h2>
              <ul className="casts">
                {casts? casts.map((cast, index) => <li key={index}>
                  <span><a href={'/actors'}>{cast}</a></span>       
                </li>) : ''}
              </ul>
            </div>
          </div>  

          <div className="detail-info">
            <h1 className="title">Title : {title}</h1>
            
            <span>
            <h2> OverView : {overview}</h2>
            </span>  

            <span>
            <h2> Release date : {release_date}</h2>
            <h2> Runtime : {runtime} minutes</h2>
            <h2> Vote Average : {vote_average} </h2>
            <h2> Revenue : ${revenue.toLocaleString('en')} </h2>
            {/* Genre: <span className="font-weight-bold">{genres}</span>{' '} */}
            {/* <ReactPlayer url="https://www.youtube.com/watch?v=k71hjl3zWsA" controls={true}/> */}
            <ReactPlayer url={this.state.video_url} controls={true}/>

            </span>  

          </div>
      </div>
      
      <div className="detail">
        <div className='container'>
 

            <div className="journals">
             
              <h2>{journals && journals.length>0 ? ' Journals':''}</h2>
              {journals && journals.map(journal => <Journal key={journal.id} {...journal} />) }
              { <JournalForm listingId={id}  currentMovie = {this.state.listing.movie.table} handleUpdateListing={this.handleUpdateListing} fetchMovie = {this.fetchMovie}/> }
            </div>

            <div className="reviews">
                {/* <h4>
                  <span className="rating">★</span>
                  &nbsp;
                  <span>{rating} ({reviews.length} reviews)</span>
                  <span>{5} ({5} reviews)</span>
                </h4> */}
                <h2>{reviews && reviews.table.results.length>0 ? 'Reviews':''}</h2>
                {reviews? reviews.table.results.map(review => <Review key={review.id} {...review} />):''} 
                {/* { <ReviewForm listingId={id} currentMovie = {this.state.listing.movie.table} handleUpdateListing={this.handleUpdateListing} fetchMovie = {this.fetchMovie}/> } */}
            </div>

       

            </div>
        </div>
      </div>
    )
  }
}

export default ListingPage