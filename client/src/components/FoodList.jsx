import React from 'react';

const FoodList = (props) => (
	<div>
	<div >Restaurant List</div>
	<ul style={{listStyle:'none', width:'500px'}}>
		{props.restaurants.map((restaurant, idx) => (
			<FoodListItem handleClick={props.handleClick} restaurant={restaurant} key={idx}/>
		))}
	</ul>
	</div>
)

const FoodListItem = (props) => (
	<li onClick={() => {props.handleClick(props.restaurant)}} style={{float: 'left', width:'100px', height:'100px', textAlign: 'center', margin:'5px', backgroundColor:'#1574cd', borderRadius:'5px'}}>
	<span style={{color: 'white', fontSize: '14px'}}>{props.restaurant.name}</span>
	<img height='50px' width='90px' src={props.restaurant.image_url}/>
	</li>
)


export default FoodList