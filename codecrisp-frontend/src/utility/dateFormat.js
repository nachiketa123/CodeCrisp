export  const timeSince = (date,short=true) => {
    date = new Date(date)
    var seconds = Math.floor((new Date() - date) / 1000);
  
    var interval = seconds / 31536000;
  
    if (interval > 1) {
      return Math.floor(interval) + (short?" yrs":" years");
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + (short?" mon":" months");
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + (short?" d":" days");
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + (short?" h":" hours");
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + (short?" m":" minutes");
    }
    return Math.floor(seconds) + (short?" s":" seconds"); 
  } 