import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import { API_URL, IMAGE_URL } from '../constants'
import { API_URL} from '../constants'
import JournalItem from './JournalItem'
const JournalList = () => {

  const movies = useSelector(state => state.movies)

  // const { comments, comment } = useSelector(state => {
  //   return {
  //     comments: state.comments,
  //     comment: state.comment
  //   }
  // })

  console.log(movies)

  const fetchListings = ()=>{

    let url = API_URL + `/movies`;

    console.log(url)
    fetch(url, {
      credentials: "include"
    })
      .then(r => r.json())
      .then(data => dispatch({ type: "SET_MOVIES", payload: data }))
  }

  // const [counter, setCounter] = userState(0)
  const dispatch = useDispatch()

  useEffect(()=>{
    // document.title = `Counter is' ${counter}`;
    // console.log('useEffect')
    fetchListings()
  })



  return (
    <div>
      {/* JournalList */}
      <section className="listings">
      {/* {movies? movies.map(movie=><div>{movie.title}</div>) : '' } */}

      {movies? movies.map(movie=><JournalItem key={movie.id} movie={movie} />) : '' }

      {/* My counter is {counter}; */}
      {/* <button onClick={increaseCounter}></button> */}
      </section>
    </div>
  )
}

export default JournalList

// return listings.map(listing => <ListingCard key={listing.table.id} listing={listing} showDetail={this.showDetail} handleUpdateListing={this.handleUpdateListing}/>)