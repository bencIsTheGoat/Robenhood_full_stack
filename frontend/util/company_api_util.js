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
        url: `https://cloud.iexapis.com/stable/stock/${ticker}/chart/1y?token=pk_a4d537a2e4054c8ca85a79513e34111b`
    })
);

export const getMultipleStockData = (tickers, time) => (
    $.ajax({ 
        method: 'GET', 
        url: `https://cloud.iexapis.com/stable/stock/market/batch?symbols=${tickers}&types=chart&range=${time}&token=pk_a4d537a2e4054c8ca85a79513e34111b`
    })
);

export const getMultipleLastPrice = (tickers) => (
    $.ajax({
        method: 'GET',
        url: `https://cloud.iexapis.com/stable/stock/market/batch?symbols=${tickers}&types=quote&token=pk_a4d537a2e4054c8ca85a79513e34111b`
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
        url: `https://cloud.iexapis.com/stable/stock/${ticker}/company?token=pk_a4d537a2e4054c8ca85a79513e34111b`
    })
);

export const getCompanyStats = (ticker) => (
    $.ajax({
        method: 'GET',
        url: `https://cloud.iexapis.com/stable/stock/${ticker}/stats?token=pk_a4d537a2e4054c8ca85a79513e34111b`
    })
);




