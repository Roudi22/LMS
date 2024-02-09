import mongoose, {Document, Schema, Model} from "mongoose";
import { IUser } from "./user.model";

interface IComment extends Document {
    user: IUser;
    question: string;
    questionReplies?: IComment[];
}

interface IReview extends Document {
    user: object;
    rating: number;
    comment: string;
    commentReplies: IComment[];
}

interface ILink extends Document {
    title: string;
    url: string;
}

interface ICourseData extends Document {
    title: string;
    description: string;
    videoUrl: string;
    videoThumbnail: object;
    videoSection: string;
    videoLength: number;
    videoPlayer: string;
    links: ILink[];
    suggestions: string;
    questions: IComment[];
}

interface ICourse extends Document {
    name: string;
    description: string;
    price: number;
    estimatedTime: number;
    thumbnail: object;
    tags: string;
    level: string;
    demoUrl: string;
    benefits: {title: string}[];
    prerequisites: {title:string}[];
    reviews: IReview[];
    courseData: ICourseData[];
    rating?: number;
    purchased?:number;
}

const reviewSchema = new Schema<IReview>({
    user : Object,
    rating: {
        type: Number,
        default: 0
    },
    comment: String,
})

const linkSchema = new Schema<ILink>({
    title: String,
    url: String
});

const commentSchema = new Schema<IComment>({
    user: Object,
    question: String,
    questionReplies: [Object]
})
const courseDataSchema = new Schema<ICourseData>({
    videoUrl: String,
    title: String,
    videoSection: String,
    videoLength: Number,
    description: String,
    links: [linkSchema],
    suggestions: String,
    questions: [commentSchema],
});

const courseSchema = new Schema<ICourse>({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    estimatedTime: {
        type: Number,
        required: true
    },
    thumbnail: {
        public_id: {
            type: String,
            
        },
        url: {
            type: String,
        }
    },
    tags: {
        required: true,
        type: String
    },
    level: {
        type: String,
        required: true
    },
    demoUrl: {
        type: String,
        required: true
    },
    benefits: {
        type: [{title: String}],
        required: true
    },
    prerequisites: {
        type: [{title: String}],
        required: true
    },
    reviews: [reviewSchema],
    courseData: [courseDataSchema],
    rating: {
        type: Number,
        default: 0
    },
    purchased: {
        type: Number,
        default: 0
    }
})

const CourseModel: Model<ICourse> = mongoose.model('Course', courseSchema);
export default CourseModel;