import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    date: String,
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ''
    },
    imageUrl: String,
    tags: [String],
    category: {
        type: String,
        enum: ['web app', 'mobile app', 'other'],
        default: 'web app'
    },
    github: String,
    webapp: String,
    featured: {
        type: Boolean,
        default: false
    },
    order: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const Project = mongoose.model('Project', projectSchema);
export default Project;