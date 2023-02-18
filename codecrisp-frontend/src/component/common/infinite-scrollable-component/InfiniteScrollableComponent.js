import React,{useState, useEffect, useRef, useCallback} from 'react';
import isEmpty from '../../../utility/is-empty';

/*
Props definition
    1. renderChild prop is the default prop used to get the HTML
    2. scrollOfComponent, this is a string which is used to store/fetch a particular scroll position into/from the browsers session 
        storate
    3. dataArray, this is the main which is to be displayed using map()
    4. dataLoader, should be a function which is going to load more data depending on the page number
    5. identifier, this identifier is used as a parameter to dataLoader function in order to know for whome (ex: user_id) 
        the data is to be loaded
    6.moreDataAvailable: is a boolean value if there is more data available then it is true otherwise false
    7.loading is the state when the data is being loaded from the API
    8.pageNo is simply which page data we need currently
*/

const InfiniteScrollableComponent = ({
                                      renderChild,
                                      scrollOfComponent, 
                                      dataArray, 
                                      dataLoader, 
                                      identifier, 
                                      moreDataAvailable,
                                      loading,
                                      pageNo,
                                    }) =>{

  //Component State
  const [page, setPage] = useState(pageNo)

  const [scrollPosition, setScrollPosition] = useState(
    Number(sessionStorage.getItem(scrollOfComponent))
  );

  let ignore = false;

  //when component renders load all the data on particular page number(intial page 0)
  useEffect(() => {
    if (scrollPosition > 0) {
      window.scrollTo(0, scrollPosition);
    }

    if (!ignore && (isEmpty(dataArray) || dataArray[dataArray.length-1].page !== page)) {
      dataLoader({ ...identifier, page: page });
    }

    window.addEventListener('scroll',handleScroll)

    return () => {
      ignore = true;
      window.removeEventListener('scroll',handleScroll)
    };
  }, [page]);

  const observer = useRef();

  const lastElementRef = useCallback(node=>{
    if(loading) return
    if(observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries=>{
      if(entries[0].isIntersecting && moreDataAvailable){
        setPage(prevPage=>prevPage+1)
      }
    },{threshold:0.8})
    if(node) observer.current.observe(node)
  },[loading,moreDataAvailable])


  const handleScroll = () =>{
      setScrollPosition(scrollOfComponent,window.scrollY)
      sessionStorage.setItem(scrollOfComponent,window.scrollY)
  }

  return (
    !isEmpty(dataArray)? dataArray.map((data,index)=>{
      
      if(index+1 === dataArray.length){
        return (
          <div ref={lastElementRef}>
            {renderChild(data)}
          </div>
        )
      }
      return (
        <div >
          {renderChild(data)}
        </div>
      )
      
      
    }):''
  )
 
    
    
}

export default InfiniteScrollableComponent;