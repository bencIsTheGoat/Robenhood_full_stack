import * as CompUtils from '../util/company_api_util';
import {receiveErrors } from './session_actions';

export const RECEIVE_COMPANY = 'RECEIVE_COMPANY';
export const RECEIVE_COMPANIES = 'RECEIVE_COMPANIES';
export const RECEIVE_DATA = 'RECEIVE_DATA';
export const RECEIVE_USER_STOCK_DATA = 'RECEIVE_USER_STOCK_DATA';

export const receiveCompany = company => ({
    type: RECEIVE_COMPANY,
    company
});

export const receiveStockData = (ticker, data) => ({
    type: RECEIVE_DATA,
    data,
    ticker
});

export const receiveCompanies = companies => ({
    type: RECEIVE_COMPANIES,
    companies
});

export const fetchCompanies = () => dispatch => (
    CompUtils.fetchCompanies().then(companies => dispatch(receiveCompanies(companies)))
);

export const fetchCompany = id => dispatch => (
    CompUtils.fetchCompany(id).then(company => dispatch(receiveCompany(company)), errors => dispatch(receiveErrors(errors)))
);

export const createCompany = company => dispatch => (
    CompUtils.createCompany(company).then(company => dispatch(receiveCompany(company)),
    errors => dispatch(receiveErrors(errors)))
);

export const getStockData = (ticker, time) => dispatch => {
    // ticker = ticker;
    return CompUtils.getStockData(ticker, time).then(data => dispatch(receiveStockData(ticker, data)))
};

// Getting portfolio data

// export const receiveUserStockData = ({ company, data }) => ({
//     type: RECEIVE_USER_STOCK_DATA,
//     company,
//     data
// })

// let periods = ['5y', '2y', '1y', 'ytd', '6m', '3m', '1m'];

// export const getUserStockData = id => {
//     return CompUtils.fetchCompany(id).then(company => {
//         debugger;
//         let ticker = company.ticker;
//         debugger;
//         let data = periods.map(time => {
//             debugger;
//             return CompUtils.getStockData(ticker, time).then(res => dispatch(receiveUserStockData(res.responseJSON)));
//         });
//         return { company, data };
//     }).then(result => dispatch(receiveUserStockData(result)))
// };

