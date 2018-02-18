import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
// import AnyComponent from './components/filename.jsx'

import Search from './components/Search.jsx'
import FoodList from './components/FoodList.jsx'
import GoogleMaps from './components/GoogleMap.jsx'

//ekGvIvDBQTHe83rYZ_iCWRoNa1Lmne-nZietmAWAzKkBuODqFIURoYTevX_oHX3yB_NC8c4gro22OQPlPfk2SUPWZ58OUjloSqpQU7scQaYlvbDYHW6uHOLsyNKJWnYx
class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
  		restaurants: [],
  		savedRestaurants: [],
  		showSaved: false,
  		latitude: -34.397,
  		longitude: 150.644
  	}
  	this.searchYelp = this.searchYelp.bind(this)
  	this.showSaved = this.showSaved.bind(this)
  	this.saveRestaurant = this.saveRestaurant.bind(this)
  	this.getSaved = this.getSaved.bind(this)
  	this.showLocation = this.showLocation.bind(this)
  }

  componentDidMount() {
  	// console.log('mounted')
  	// this.searchYelp({term: 'hot dogs', location: '10038'})
  	// axios.get('/saved').then(() =)
  	this.getSaved()
  }

  searchYelp(searchParams) {
  	console.log('in app', searchParams)
  	axios.get('/search', { params : {
  		term: searchParams.term,
  		location: searchParams.location
  	}})
  	.then((response) => {
  		this.setState({
  			restaurants: response.data.businesses
  		})
  	})
  }

  showSaved() {
  	this.setState({
  		showSaved: !this.state.showSaved
  	})
  }

  saveRestaurant(restaurant){
  	// console.log(restaurant)
  	axios.post('/saved', restaurant).then(() => {
  		this.getSaved()
  	})

  }

  getSaved() {
  	axios.get('/saved').then((response) => {
  		this.setState({
  			savedRestaurants: response.data
  		})
  	})
  }

  showLocation(restaurant) {
  	// console.log('inside location', restaurant)
  	this.setState({
  		longitude: restaurant.longitude,
  		latitude: restaurant.latitude

  	})
  }

  render () {
  	return ( this.state.showSaved ? 
		<div>Yelp Restaurants <button onClick={() => {this.showSaved()}}>Show Saved</button> 
	  	<FoodList restaurants={this.state.savedRestaurants} handleClick={this.showLocation}/>
  		<div style={{display: 'block'}}>
  		<GoogleMaps isMarkerShown
  					googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
  					loadingElement={<div style={{ height: `100%` }} />}
  					containerElement={<div style={{ height: `400px` }} />}
  					mapElement={<div style={{ height: `100%` }}/>}
  					latitude={this.state.latitude}
  					longitude={this.state.longitude}
  					/>
  					</div>
  		</div>
  		:
  		<div>Yelp Restaurants <button onClick={() => {this.showSaved()}}>Show Saved</button> 
		<Search onSearch={this.searchYelp}/>
	  	<FoodList restaurants={this.state.restaurants} handleClick={this.saveRestaurant}/>
  		</div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));