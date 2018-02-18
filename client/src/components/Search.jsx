import React from 'react';

class Search extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			term: '',
			location: ''
		}
		this.handleTerm = this.handleTerm.bind(this)
		this.handleLocation = this.handleLocation.bind(this)
		this.handleSearch = this.handleSearch.bind(this)
	} 

	handleTerm(e) {
		this.setState({
			term: e.target.value
		})
	}
	handleLocation(e) {
		this.setState({
			location: e.target.value
		})
	}
	handleSearch() {
		// console.log(this.state.input)
		this.props.onSearch({
			term: this.state.term,
			location: this.state.location
		})
		this.setState({
			term: '',
			location: ''
		})
	}
	render() {
		return (<div>Find restaurants: 
			<input type='text' value={this.state.term} placeholder='Food' onChange={(e) => {this.handleTerm(e)}}></input>
			<input type='text' value={this.state.location} placeholder='location' onChange={(e) => {this.handleLocation(e)}}></input>
			<button onClick={() => {this.handleSearch()}}>Search</button>
			</div>)
	}
}

export default Search










