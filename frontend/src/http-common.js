import axios from "axios"

export default axios.create({
    baseURL: "http://yelpclone-env.eba-zma3vudm.us-east-1.elasticbeanstalk.com/api/v1/restaurants", 
    headers: {
        "Content-type": "application/json"
    }
});