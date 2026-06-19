import mongoose,{Schema} from "mongoose"
const subscriptionSchema = new Schema({
    subscriber:{
        type: Schema.Types.ObjectId,
        ref:"User",
    },
    channel:{

        type:Schema.Types.ObjectId,
        ref:"User"
    }
    

},{timestamps:true})
export const Subscripton = mongoose.model("Subscription",subscriptionSchema)

