import ReviewsDAO from "../dao/reviewsDAO.js"

export default class ReviewsController {
    static async apiPostReview(req, res, next){
        try {
            const restaurant_id = req.body.restaurant_id
            const review = req.body.text
            const userInfo = {
                name: req.body.name, 
                _id: req.body.user_id
            }
            const date = new Date()

            const ReviewResponse = await ReviewsDAO.addReview(
                restaurant_id, 
                userInfo, 
                review, 
                date,
            )

            console.log(ReviewResponse)

            res.json({ status: "fuck yea we posted a review!"})
        } catch(e){
            res.status(500).json({error: e.message})
        }
    }

    static async apiUpdateReview(req, res, next){
        try {
            const reviewId = req.body.review_id
            const text = req.body.text
            const date = new Date()

            const reviewResponse = await ReviewsDAO.updateReview(
                reviewId, 
                req.body.user_id, 
                text, 
                date,
            )

            var { error } = reviewResponse
            if (error) {
                res.status(400).json({ error })
            }

            if (reviewResponse.modifiedCount === 0 ) {
                throw new Error(
                    "unable to update review - user may not be original poster"
                )
            }

            res.json({status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message})
        }
    }

    static async apiDeleteReview(req, res, next){ 
        try {
            const reviewId = req.query._id
            const userId = req.body.user_id
            const reviewResponse = await ReviewsDAO.deleteReview(
                reviewId, 
                userId,
            )
            res.json({ status: "deleted!" })
        } catch (e) {
            res.status(500).json({ error: e.message})
        }
    }

}