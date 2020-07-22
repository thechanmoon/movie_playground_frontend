import React from 'react'
import ListingCard from './ListingCard'
// import ListingMap from './ListingMap'
// import FilterBar from './FilterBar'
// import Pager from './Pager'
import LoadingSpinner from './LoadingSpinner'

import { API_URL } from '../constants'

class ListingsContainer extends React.Component {

  // initial state
  state = {
    fourStarOnly: false,
    startIndex: 0,
    listings: [],
    showMap: true,
    loaded: false,
    searchTerm: '',
    indexTerm: ''
  }

  componentDidMount() {
    this.fetchListings()
  }

  componentDidUpdate(prevProps) {
      // this.setState({ loaded: false })
      // this.fetchListings()
      console.log(prevProps);
      console.log(this.props);
      console.log(prevProps.searchTerm);
      console.log(this.props.searchTerm);
      if(prevProps.searchTerm !== this.props.searchTerm)
      {
        this.setState({searchTerm: this.props.searchTerm})
        this.fetchSearchListings(this.props.searchTerm)
        this.setState({searchTerm: '????'})
      }else if(prevProps.indexTerm !== this.props.indexTerm){
        this.setState({ indexTerm: this.props.indexTerm})
        this.fetchListings(this.props.indexTerm)
      }
  }

  fetchListings(indexTerm = '') {

    console.log(this.props)
    console.log('indexTerm : ', indexTerm)
    // console.log('searchTermv: ', searchTerm)
    // let url = API_URL + `/apis?query=${indexTerm}`;
    let url = API_URL + `/lists?query=${indexTerm}`;
    // if(searchTerm!='')
    // {
    //   url = API_URL + `/search?query='${searchTerm}'`
    // }

    console.log(url)
    // const city = this.props.match.params.city || ""
    fetch(url, {
      credentials: "include"
    })
      .then(r => r.json())
      .then(listings => {
        console.log(listings)
        this.setState({
          listings: listings,
          startIndex: 0,
          loaded: true,
        })
      })
  }

  fetchSearchListings(searchTerm='') {

    console.log(this.props)
    // console.log('indexTerm : ', indexTerm)
    console.log('searchTermv: ', searchTerm)
    // let url = API_URL + `/movies?query=${indexTerm}`;

    // if(searchTerm!='')
    // {
    let url = API_URL + `/search?query='${searchTerm}'`
    // }

    console.log(url)
    // const city = this.props.match.params.city || ""
    fetch(url, {
      credentials: "include"
    })
      .then(r => r.json())
      .then(listings => {
        console.log(listings)
        this.setState({
          listings: listings,
          startIndex: 0,
          loaded: true,
          searchTerm: ''
        })
      })
  }

  // Event handlers
  toggleShowMap = () => {
    this.setState(prevState => ({
      showMap: !prevState.showMap
    }))
  }

  handleFourStarFilter = () => {
    this.setState(prevState => ({
      fourStarOnly: !prevState.fourStarOnly,
      startIndex: 0
    }))
  }

  handleUpdateIndex = startIndex => {
    this.setState({ startIndex: startIndex })
  }

  handleUpdateListing = updatedListing => {
    const updatedListings = this.state.listings.map(listing => {
      if (updatedListing.id === listing.id) {
        return updatedListing
      } else {
        return listing
      }
    })

    this.setState({
      listings: updatedListings
    })
  }

  showDetail = id => {
    console.log('showDetail id = ' , id)
    this.props.history.push(`/listings/${id}`)
  }

  getFilteredListings() {
    let listingsToDisplay = this.state.listings
    // filter based on fourStarRating filter (from state)
    if (this.state.fourStarOnly) {
      listingsToDisplay = listingsToDisplay.filter(listing => listing.rating >= 4)
    }
    return listingsToDisplay
  }

  getPagedListings(listings) {
    // return listings.slice(this.state.startIndex, this.state.startIndex + 15)
  }

  getSearchedListing()
  {

  }

  getListingCards(listings) {
    console.log(listings)
    return listings
      .map(listing => <ListingCard key={listing.table.id} listing={listing} showDetail={this.showDetail} handleUpdateListing={this.handleUpdateListing}/>)
  }

  // getListingCards(listings) {
  //   return listings
  //     .map(listing => <ListingCard key={listing.id} listing={listing} showDetail={this.showDetail} handleUpdateListing={this.handleUpdateListing} />)
  // }

  render() {
    if (!this.state.loaded) {
      return <LoadingSpinner />
    }

    // const filteredListings = this.getFilteredListings()
    // const pagedListings = this.getPagedListings(filteredListings)
    const listingCards = this.getListingCards(this.state.listings)

    return (
      <>
        {/* Movie */}
        {/* <FilterBar
          handleFourStarFilter={this.handleFourStarFilter}
          showMap={this.state.showMap}
          toggleShowMap={this.toggleShowMap}
        />
        {this.state.showMap ? (
          <section className="map-listings">
            <div className="details">
              {listingCards}
            </div>
            <ListingMap listings={pagedListings} showDetail={this.showDetail} handleUpdateListing={this.handleUpdateListing} />
          </section>
        ) : (
            <section className="listings">
              {listingCards}
            </section>
          )}

        <Pager
          startIndex={this.state.startIndex}
          total={filteredListings.length}
          handleUpdateIndex={this.handleUpdateIndex}
        /> */}
            <section className="listings">
              {listingCards}
            </section>
      </>
    )
  }
}

export default ListingsContainer