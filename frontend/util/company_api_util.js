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

export const fetchCompanies = () => (
    $.ajax({
        method: 'GET',
        url: 'api/companies',
    })
)