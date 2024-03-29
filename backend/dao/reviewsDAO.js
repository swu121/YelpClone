import mongodb from "mongodb"
const ObjectID = mongodb.ObjectId

let reviews

export default class ReviewsDAO {

    static async injectDB(conn){

        console.log("initalizing review db")

        if (reviews){
            return
        }
        try {
            reviews = await conn.db(process.env.RESTREVIEWS_NS).collection("reviews")
        } catch (e) {
            console.error(`Unable to establish collection handles in userDAO: ${e}`)
        }
    }


    static async addReview(restaurantId, userInfo, review, date){
        try{
            
            const reviewInfo = { 
                name: userInfo.name,
                user_id: userInfo._id,
                restaurant_id : ObjectID(restaurantId),
                text: review,
                date: date, 
            }
            console.log(restaurantId);
            return await reviews.insertOne(reviewInfo)
        
        }
        catch (e) {
            console.error(`Unable to post review: ${e}`)
            return { error: e }
        }
    }

    static async updateReview(reviewId, userId, text, date){
        try {
            const updateResponse = await reviews.updateOne(
                { user_id: userId, _id: ObjectID(reviewId)},
                { $set: { text: text, date: date }}, 
            )
            return updateResponse}
        catch (e) {
            console.error(`Unable to update review: ${e}`)
            return { error: e}
        }
    }
 
    static async deleteReview(reviewId, userId){

        try {
            const deleteResponse = await reviews.deleteOne({
                _id: ObjectID(reviewId), 
                user_id: userId,
            })

            return deleteResponse
        } catch (e) {
            console.error(`Unable to delete review: ${e}`)
            return {error: e}
        }
    }
}