import React, { Component } from 'react';
import NewsItem from './NewsItem';


export class News extends Component {
  
    constructor(){
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0,
        };
    }

    async componentDidMount() {
        let url = "https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=dad0641e10bf466281bfda08caae1528&page=1&pagesize=6";
        this.setState({ loading: true });
        
        let data = await fetch(url);
        let parseData = await data.json();
        
        this.setState({
            articles: parseData.articles,
            totalResults: parseData.totalResults,
            loading: false       
        });
    }

    handleNext = async () => {
        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / 6))) {
            let url = `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=dad0641e10bf466281bfda08caae1528&page=${this.state.page + 1}&pagesize=6`;
            this.setState({ loading: true });
            
            let data = await fetch(url);
            let parseData = await data.json();
            
            this.setState({
                page: this.state.page + 1,
                articles: parseData.articles,
                loading: false
            });
        }
    }

    handlePrevious = async () => {
        let url = `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=dad0641e10bf466281bfda08caae1528&page=${this.state.page - 1}&pagesize=6`;
        this.setState({ loading: true });
        
        let data = await fetch(url);
        let parseData = await data.json();
        
        this.setState({
            page: this.state.page - 1,
            articles: parseData.articles,
            loading: false,
        });
    }

    render() {
        return (
            <div className="container my-3">
                <center><h2>News Top Headlines</h2></center>
                
                
                <div className="row">
                    {this.state.articles.map((element) => {
                        return (
                            <div className="col-md-3" key={element.url}>
                                <NewsItem 
                                    title={element.title ? element.title.slice(0, 46) : "No Title"} 
                                    description={element.description ? element.description.slice(0, 88) : "No Description"} 
                                    imageUrl={element.urlToImage} 
                                    newsUrl={element.url} 
                                />
                            </div>
                        );
                    })}
                </div>
                
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevious}> 
                        &larr; Previous
                    </button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / 6)} type="button" className="btn btn-dark" onClick={this.handleNext}>
                        Next &rarr;
                    </button>
                </div>
            </div>
        );
    }
}

export default News;
