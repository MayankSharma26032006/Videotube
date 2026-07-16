import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app = express()
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

import userRouter from './routes/user.routes.js'
app.use("/api/v1/user",userRouter)

import videoRouter from './routes/video.routes.js'
app.use("/api/v1/videos",videoRouter)
import commentRouter from './routes/comment.routes.js'
app.use("/api/v1/comments", commentRouter)
import likeRouter from './routes/like.routes.js'
app.use("/api/v1/likes", likeRouter)
import subscriptionRouter from './routes/subscription.routes.js'
app.use("/api/v1/subscriptions", subscriptionRouter)
import playlistRouter from './routes/playlist.routes.js'
app.use("/api/v1/playlists", playlistRouter)

export default app


