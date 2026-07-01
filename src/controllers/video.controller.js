import mongoose, { isValidObjectId } from "mongoose"
import { Video } from "../models/video.model.js"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"

const getAllVideos = asyncHandler(async(req,res)=>{
    const{
    page = 1,
    limit = 10,
    query,
    sortBy = "createdAt",
    sortType = "desc",
    userId
    }=req.query
    const pipeline = []
    if(userId){
        if(!isValidObjectId(userId)){
            throw new ApiError(404,"Invalid Userid")
        }
    }
    pipeline.push({
        $match:{
            owner:new mongoose.Types.ObjectId(userId)
        }
    })

    if(query){
        pipeline.push({
            $match:{
                $or:[
                    {title:{$regex:query,$options:"i"}},
                    {description:{$regex:query,$options:"i"}}
                ]
            }
        })
    }
    
    pipeline.push({
        $match:{isPublished:true}
    })

    pipeline.push(
        {
            $sort:{
                [sortBy]: sortType === "asc"?1:-1
            }
        }
    )

    pipeline.push(
        {
            $lookup:{
                from:"users",
                localField:"owner",
                foreignField: "_id",
                as:"owner",
                pipeline:[
                    {
                        $project:{
                            fullname:1,
                            username:1,
                            avatar:1
                        }
                    }
                ]
            }
        },
        {
            $addFields:{
                owner:{$first:"owner"}
            }
        }
    )


    const options = {
        page:parseInt(page),
        limit:parseInt(limit)
    }

    const videos = await Video.aggregatePaginate(
        Video.aggregate(pipeline),
        options
    )
    return res
    .status(200)
    .json(new ApiResponse(200,videos,"Videos fetched successfully"))

})