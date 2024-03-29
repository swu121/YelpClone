import React, { useEffect } from "react";
import RestaurantDataService from "../services/RDS"
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";

const Restaurants = props => {
  let {id} = useParams();
  const initialRestaurantState = {
    id: null, 
    name: "", 
    address: {}, 
    cuisine: "",
    reviews: []
  };

  const [restaurant, setRestaurant] = useState(initialRestaurantState);

  const getRestaurant = id => {
    RestaurantDataService.get(id)
      .then(response => {
        setRestaurant(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    console.log(id);
    getRestaurant(id); 
    console.log(restaurant.reviews)
  }, []);

  const deleteReview = (reviewId, index) => {
    RestaurantDataService.deleteReview(reviewId, props.user.id)
      .then(response => {
        setRestaurant((prevState) => {
          prevState.reviews.splice(index, 1)
          return({
            ...prevState})
          })
        })
      .catch(e=> {
        console.log(e);
      });
  };

  return (
    <div> 
      {restaurant? (
        <div>
          <h5>{restaurant.name}</h5>
          <p>
            <strong>Cuisine: </strong>{restaurant.cuisine}<br/>
            <strong>Address: </strong>{restaurant.address.building} {}
          </p>
          <Link to = {"/restaurants/" + id + "/review"} className="btn btn-primary">
            Add Review
          </Link>
          <h4> Reviews </h4>
          <div className = "row">
            {restaurant.reviews.length > 0 ? (
              restaurant.reviews.map((review, index) => {
                return (
                  <div className = "col-lg-4 pb-1" key = {index}>
                    <div className = "card">
                      <div className="card-body">
                        <p className="card-text">
                          {review.text}
                          <br/>
                          <strong>User: </strong>{review.name}
                          <br/>
                          <strong>Date: </strong>{review.date}
                        </p>
                        {props.user && props.user.id === review.user_id &&
                          <div className = "row">
                            <a onClick = {() => deleteReview(review._id, index)} className="btn btn-primary col-lg-5 mx-1 mb-1">Delete</a>
                            <Link to =  {{
                              pathname: "/restaurants/" + id + "/review",
                              state: {
                                currentReview: review
                              }
                            }} className = "btn btn-primary col-lg-5 mx-1 mb-1">Edit</Link>
                          </div>
                        } 
                      </div>
                    </div>
                  </div>  
                );
              })
            ) : (
              <div className = "col-sm-4">
                <p>No reviews yet.</p>
              </div>
            )}
          </div>
        </div>    
      ) : (
        <div>
          <p>No restaurant found</p>
        </div>
      )}
    </div>
  );
};

export default Restaurants;