import mongoose from 'mongoose';

const skillItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: String,
    proficiency: {
        type: Number,
        min: 0,
        max: 100,
        default: 80
    }
});

const skillCategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    skills: [skillItemSchema],
    order: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const Skill = mongoose.model('Skill', skillCategorySchema);
export default Skill;