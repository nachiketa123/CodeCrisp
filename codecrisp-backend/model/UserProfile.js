const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserProfile = new Schema({
  user: {
    type: Schema.Types.ObjectId, 
    ref: "user_data",
  },
  handle: {
    type: String,
    max: 30,
  },
  company: {
    type: String,
  },
  website: {
    type: String,
  },
  location: {
    type: String,
  },
  current_job_title: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  bio: {
    type: String,
    default: 'I Joined Codecrisp'
  },
  experience: [
    {
      title: {
        type: String,
        required: true,
      },
      company: {
        type: String,
        required: true,
      },
      location: {
        type: String,
      },
      fromDate: {
        type: Date,
        required: true,
      },
      toDate: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false,
      },
      descrption: {
        type: String,
      },
    },
  ],
  education: [
    {
      school: {
        type: String,
        required: true,
      },
      degree: {
        type: String,
        required: true,
      },
      fieldOfStudy: {
        type: String,
        required: true,
      },
      fromDate: {
        type: Date,
        required: true,
      },
      toDate: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false,
      },
      descrption: {
        type: String,
      },
    },
  ],
  social: {
    youtube: {
      type: String,
    },
    twitter: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    facebook: {
      type: String,
    },
    instagram: {
      type: String,
    },
    githubusername: {
        type: String,
    },
  },
  registration_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports  = mongoose.model("user_profile", UserProfile);