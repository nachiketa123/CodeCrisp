module.exports = {

    //accoring to date
    compareDateDesc : (a,b)=>{
        if( a.date < b.date )
            return 1;
        if( a.date > b.date )
            return -1;
        return 0;
    }
}