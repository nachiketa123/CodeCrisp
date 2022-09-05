/*
dc: default class: String
cc: conditional class: String
condition: return statement depends on the condition
eitherOr: if true only returns either dc or cc depending on condition
*/

const getClassNames = (cls={dc:'',cc:''},condition=false,eitherOr=false) =>{

    
    //if either or is true
    if(eitherOr && condition)
        return cls.cc;
    if(eitherOr && !condition)
        return cls.dc;
    
    //if either or is false
    let newcls = cls.dc
    if( !condition )
        return newcls;
    newcls = newcls + ' ' +cls.cc
    return newcls;
    
}

export default getClassNames;