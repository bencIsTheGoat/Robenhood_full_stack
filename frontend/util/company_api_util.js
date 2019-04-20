export const fetchCompany = id => (
    $.ajax({
        method: 'GET',
        url: `api/companies/${id}`
    })
);

export const createCompany = company => (
    $.ajax({
        method: 'POST',
        url: 'api/companies',
        data: {company}
    })
);

export const getStockData = (ticker, time) => (
    $.ajax({
        method: 'GET',
        url: `https://api.iextrading.com/1.0/stock/${ticker}/chart/${time}`
    })
);

export const getMultipleStockData = (tickers, time) => (
    $.ajax({ 
        method: 'GET', 
        url: `https://api.iextrading.com/1.0/stock/market/batch?symbols=${tickers}&types=chart&range=${time}`
    })
);

export const getMultipleLastPrice = (tickers) => (
    $.ajax({
        method: 'GET',
        url: `https://api.iextrading.com/1.0/stock/market/batch?symbols=${tickers}&types=quote`
    })
);


export const fetchCompanies = () => (
    $.ajax({
        method: 'GET',
        url: 'api/companies',
    })
);

export const getCompanyInfo = (ticker) => (
    $.ajax({
        method: 'GET',
        url: `https://api.iextrading.com/1.0/stock/${ticker}/company`
    })
);

export const getCompanyStats = (ticker) => (
    $.ajax({
        method: 'GET',
        url: `https://api.iextrading.com/1.0/stock/${ticker}/stats`
    })
);




