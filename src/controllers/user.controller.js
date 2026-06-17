import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import{User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js";
const registerUser = asyncHandler(async (req, res) => {
  console.log('ENTER registerUser')
  // get user details
  // validation - not empty
  // check if user already exists
  // check for img, avatar
  // upload img to cloudinary, avatar
  // create user object - create entry in db
  // remove password, refresh token from response
  // check for user creation
  // return response

  const { fullName, email, username, password } = req.body;
  console.log("email:", email);
  if(fullName===""){
    throw new ApiError(400,"fullname is required")
  }
  if(email===""){
    throw new ApiError(400,"email is required")
  }
  if(password===""){
    throw new ApiError(400,"password is required")
  }
  if(username===""){
    throw new ApiError(400,"username is required")
  }

  const existedUser = await User.findOne({
    $or:[{username},{email}]
  })
  if(existedUser){
    throw new ApiError(409,"User already exists")
  }

  console.log('DEBUG content-type:', req.headers['content-type'])
  console.log('DEBUG req.files:', req.files)
  console.log('DEBUG req.body:', req.body)

  const avatarLocalPath = req.files?.avatar[0]?.path
  // const coverImageLocalPath = req.files?.coverImage[0]?.path
  let coverImageLocalPath;
  if(req.files&& Array.isArray(req.files.coverImage)&&req.files.coverImage.length>0){
    coverImageLocalPath = req.files.coverImage[0].path

  }



  if(!avatarLocalPath){
    throw new ApiError(400,"Avatar is required")
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath)
  const coverImage = await uploadOnCloudinary(coverImageLocalPath)

  if(!avatar){
    throw new ApiError(400,"Avatar is required")
  }
  const user = await User.create({
    fullname: fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase()
  })

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  )

  if(!createdUser){
    throw new ApiError(500,"Something went wrong while registering")
  }
  

  return res.status(201).json(
    new ApiResponse(201,createdUser,"User registered successfully")
  )
});

export { registerUser };