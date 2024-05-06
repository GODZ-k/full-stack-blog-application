import mongoose, { model , Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import slugify  from "slugify"

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        // required: true
    },
    slug: {
        type: String
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    content: {
        type: String,
        required: true
    }
},{timeStamps:true})



blogSchema.pre("save" , async function(next){
    if(!this.isModified("title")) return next()

    this.slug = slugify(this.title,{
        replacement:"-",
        lower:true,
        strict:true,
    })
    next()
})

blogSchema.plugin(mongooseAggregatePaginate)

const Blog = model("Blog", blogSchema)

export default Blog