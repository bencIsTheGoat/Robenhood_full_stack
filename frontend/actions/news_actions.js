import * as NewsUtils from '../util/news_api_util';

export const RECEIVE_PORTFOLIO_NEWS = 'RECEIVE_PORTFOLIO_NEWS';
export const RECEIVE_COMPANY_NEWS = "RECEIVE_COMPANY_NEWS";

export const receivePortfolioNews = (news) => ({
    type: RECEIVE_PORTFOLIO_NEWS,
    news
});

export const receiveCompanyNews = (news) => ({
    type: RECEIVE_COMPANY_NEWS,
    news
});

export const fetchPortfolioNews = () => dispatch => {
 
    return NewsUtils.fetchPortfolioNews().then(news => {
     
        return dispatch(receivePortfolioNews(news));
    })
};

export const fetchCompanyNews = (name) => dispatch => (
    NewsUtils.fetchCompanyNews(name).then(news => dispatch(receiveCompanyNews(news)))
);