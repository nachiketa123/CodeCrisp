const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dzoue3vlz',
    api_key:'689852494121435',
    api_secret:'oLuDlvYnolqMO1eY-rIzSP_OLxk',
    secure: true
})

module.exports = cloudinary