// const NewsAPI = require('newsapi');
// const newsapi = new NewsAPI('3ad1b3d9db3f4fd992fc5f6dfee0ec81');

// fetches news items relating to portfolio of companies

export const fetchPortfolioNews = () => {
    return $.ajax({
        method: "GET", 
        url: `https://newsapi.org/v2/everything?q=finance&domains=wsj.com,cnbc.com,&sortBy=publishedAt&apiKey=3ad1b3d9db3f4fd992fc5f6dfee0ec81`
    })
}

export const fetchCompanyNews = (company) => {
    return $.ajax({
        method: "GET",
        url: `https://newsapi.org/v2/everything?q=${company}&domains=wsj.com,cnbc.com,bloomberg.com&sortBy=publishedAt&apiKey=3ad1b3d9db3f4fd992fc5f6dfee0ec81`
    })
}






 
