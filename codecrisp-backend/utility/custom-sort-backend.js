module.exports = {

    //accoring to date
    compareDateDesc : (a,b)=>{
        if( a.date < b.date )
            return 1;
        if( a.date > b.date )
            return -1;
        return 0;
    },
    //accoring to date
    compareDateAsc : (a,b)=>{
        if( a.dt_time < b.dt_time )
            return -1;
        if( a.dt_time > b.dt_time )
            return 1;
        return 0;
    }
}