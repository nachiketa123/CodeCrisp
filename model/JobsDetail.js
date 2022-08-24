const mongoose = require('mongoose');
const schema = mongoose.Schema;

const jobSchema = new schema({

    jobname: {
        type: String,
        required: true
    }
    , jobdesc: {
        type: String,
        required: true
    }
    , company: {
        type: String,
        required: true
    }
    , joblocation: {
        type: String,
        required: true
    }
    , startdate: {
        type: Date,
        required: true
    }, enddate: {
        type: Date,
        required: true
    }
})


module.exports = mongoose.model("job_data", jobSchema)  