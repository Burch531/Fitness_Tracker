const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workout = new Schema({
    day: {
        type: Number,
        default:Date.now
        
    },
    exercises: [
        {
            type: {
                type: String,
                trim: true,
                required: "Enter exercise"
            },
            name: {
                type: String,
                trim: true,
                required: "Enter your exercise name"
            },
            duration: {
                type: Number,
                required: "Enter your exercise duration in minutes"
            },
            weight: {
                type: Number
            },
            reps: {
                type: Number
            },
            sets: {
                type: Number
            },
            distance: {
                type: Number
            }
        }
    ]
},
{
    toJSON: {
    
      virtuals: true
    }
  }
);

workout.virtual("totalDuration").get(function() {
    // "reduce" array of exercises down to just the sum of their durations
    return this.exercises.reduce((total, exercise) => {
      return total + exercise.duration;
    }, 0);
  });

const Workout = mongoose.model("Workout", workout);

module.exports = Workout;