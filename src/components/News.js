import React, { useEffect, useState} from 'react';

import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News =(props)=>{
    const [articles, setArticles]=useState([]);
    const [loading, setLoading]=useState(true);
    const [page, setPage]=useState(1);
    const [totalResults, settotalResults]=useState(0);

    const   capitalize=(string)=>{
        return string.charAt(0).toUpperCase()  + string.slice(1);
     }   
  
    const upadateNews=async ()=>{
        props.setProgress(10);
        const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);

        let data= await  fetch(url);
        props.setProgress(30);

        let parsedData=  await data.json();
        props.setProgress(60);
        setArticles(parsedData.articles);
        settotalResults(parsedData.totalResults);
        setLoading(false);
        props.setProgress(100);
    }
    useEffect(()=>{
        document.title=`${capitalize(props.category)} - NewsApp`;
        upadateNews();
    },[]);
    // handlePrev=async ()=>{
        // let  url=`https://newsapi.org/v2/top-headlines?&country=${props.country}&category=${props.category}&apiKey=75cc2b1685b540898a5ad1532fa6d771&page=${this.state.page - 1}&pageSize=${props.pageSize}`;
        // let data= await  fetch(url);
        // {this.setState({loading:true})};
        // let parsedData=  await data.json();
        // this.setState({
        //     page: this.state.page -1,
        //     articles: parsedData.articles,
        //     loading:false
        // })

    //     this.setState({
    //         page: this.state.page -1,
    //     });
    //     this.upadateNews();
    // };
//    const handleNext= async()=>{
            // if(!(this.state.page +1 > Math.ceil(props.pageSize/this.state.pageSize))){
            //     let  url=`https://newsapi.org/v2/top-headlines?&country=${props.country}&category=${props.category}&apiKey=75cc2b1685b540898a5ad1532fa6d771&page=${this.state.page + 1}&pageSize=${props.pageSize}`;
            //     let data= await  fetch(url);
            //     {this.setState({loading:true})};
            //     let parsedData=  await data.json();
            //     this.setState({
            //         page: this.state.page + 1,
            //         articles: parsedData.articles,
            //         loading:false
            //     })
            // }
            
            // setPage(page+1);
    //         this.upadateNews();
        
    // }

   const  fetchMoreData = async () => {
        const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        // {this.setState({loading:true})};
        setPage(page+1);

        let data= await  fetch(url);
        let parsedData=  await data.json();
        setArticles(articles.concat(parsedData.articles));
        settotalResults(parsedData.totalResults);

     };
    return (
      <>
        <h1 className="text-center" style={{marginTop:'90px'}}>NewsApp - Top {capitalize(props.category)} Headlines</h1>   
            {loading && <Spinner/>}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner/>}
                >
  
                <div className="container">
                    <div className="row">
                        { articles.map((element)=>{
                        return <div className="col-md-4" key={element.url} >
                        <NewsItem title={element.title ? element.title :""} description={element.description ?element.description : ""} 
                        imageurl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/> 
                        </div>
                        })}
                    </div> 
                </div>
               
            </InfiniteScroll>
         {/* <div className="container d-flex justify-content-between">
         <button type="button" disabled={this.state.page <=1} className="btn btn-dark" onClick={this.handlePrev}> &larr; Previous</button>
         <button type="button" disabled={this.state.page +1 > Math.ceil(props.pageSize)} className="btn btn-dark" onClick={this.handleNext}>Next &rarr; </button>
   
         </div> */}

      </>
    )

}

News.defaultProps={
    country:'in',
    pageSize:8,
    category: 'general' 
}

News.prototyps={
    country: PropTypes.string,
    pageSize :PropTypes.number,
    category: PropTypes.string,
}
export default News
