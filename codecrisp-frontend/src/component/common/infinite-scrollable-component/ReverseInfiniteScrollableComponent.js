import React, { useState, useEffect, useRef, useCallback } from 'react';
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
    9. reverseScroll: false/true. If we need reverse scrolling i.e down to up then we can set this prop
*/
const ReverseInfiniteScrollableComponent = ({
  renderChild,
  scrollOfComponent, 
  dataArray, 
  dataLoader, 
  identifier, 
  moreDataAvailable,
  loading,
  pageNo,
  reverseScroll = false, 
}) => {

  const [page, setPage] = useState(pageNo);
  const [scrollPosition, setScrollPosition] = useState(
    Number(sessionStorage.getItem(scrollOfComponent))
  );

  const containerRef = useRef(); 
  const prevScrollHeightRef = useRef(0); 

  let ignore = false;

  // Load data on mount and set initial scroll position
  useEffect(() => {
    if (!ignore && (isEmpty(dataArray) || dataArray[0].page !== page)) {
      dataLoader({ ...identifier, page });
    }

    if (scrollPosition > 0) {
      window.scrollTo(0, scrollPosition);
    }

    if(containerRef.current) {
        containerRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      ignore = true;
      if(containerRef.current) {
        containerRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [page]);

  useEffect(() => {
    setPage(pageNo);
  }, [pageNo]);

  const observer = useRef();

  const firstElementRef = useCallback(node => {
    if (loading || !moreDataAvailable) return;

    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && moreDataAvailable && !loading) {
        if (containerRef.current) {
          prevScrollHeightRef.current = containerRef.current.scrollHeight;
        }
        setPage(prevPage => prevPage + 1); 
      }
    }, { threshold: 0.8 });
    if (node) observer.current.observe(node);
  }, [loading, moreDataAvailable]);

  const handleScroll = () => {
    const position = reverseScroll
      ? containerRef.current.scrollHeight - containerRef.current.scrollTop
      : window.scrollY;
    setScrollPosition(scrollOfComponent, position);
    sessionStorage.setItem(scrollOfComponent, position);
  };

  // Adjust scroll position after new data is loaded to avoid shifting
  useEffect(() => {
    if (reverseScroll && containerRef.current) {
      const newScrollHeight = containerRef.current.scrollHeight;
      const heightDifference = newScrollHeight - prevScrollHeightRef.current;
      
      // Maintain position by shifting the scroll position by the height difference
      containerRef.current.scrollTop += heightDifference;
    }
  }, [dataArray]);

  return (
    <div ref={containerRef} style={{ overflowY: 'auto', height: '100%' }}>
      {!isEmpty(dataArray) && dataArray.map((data, index) => {
        const isFirstElement = reverseScroll ? index === 0 : index + 1 === dataArray.length;
        const ref = isFirstElement ? firstElementRef : null;

        return (
          <div id={data._id} key={data._id} ref={ref}>
            {renderChild(data)}
          </div>
        );
      })}
    </div>
  );
}

export default ReverseInfiniteScrollableComponent;
