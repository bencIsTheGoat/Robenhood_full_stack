import React from 'react';
import { fetchPortfolioNews } from '../../util/news_api_util';

class News extends React.Component {

    constructor(props) {
        super(props);
        this.state = {news: []};
        this.renderNews = this.renderNews.bind(this);
        this.timeHelper = this.timeHelper;
    }

    componentDidMount () {
        fetchPortfolioNews()
        .then(response => this.setState({news: response}))
    }

    timeHelper (time) {
        let now = new Date ();
        let articleTime = new Date (time);
        let difference = Math.floor(now - articleTime) / 1000;
        if (difference < 60) {
            return '<1m'
        } else if (difference >= 60 && difference < 3600) {
            return Math.ceil(difference /= 60) + 'm';
        } else if (difference >= 3600 && difference < 86400) {
            return Math.ceil(difference /= 3600) + 'hr';
        } else if (difference >= 86400) {
            return Math.ceil(difference /= 86400) + 'd';
        }
        
    }

    renderNews (numArticles = 20) {
        if (this.state.news.length === 0) {
            return ''
        } else {
            const articles = this.state.news.articles.slice(0, numArticles);
            return articles.map(article => {
                return (
                    <a href={article.url}>
                        <div className='article'>
                            <img src={article.urlToImage} />
                            <div className='article-info'>
                                <div className='header'>
                                    <p className='source'>
                                        {article.source.name}
                                    </p>
                                    <p className='time'>
                                        {this.timeHelper(article.publishedAt)} ago
                                    </p>
                                </div>
                                <p className='title'>
                                    {article.title}
                                </p>
                                <p className='description'>
                                    {article.description}
                                </p>
                            </div>
                        </div>
                    </a>
                   
                )
            })  
        }
    }

    render () {
    
        return (
            <div className='news-div'>
                <h1>Recent News</h1>
                {this.renderNews()}
            </div>
        );
    }


}

export default News;