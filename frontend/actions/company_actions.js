import * as CompUtils from '../util/company_api_util';
import {receiveErrors } from './session_actions';

export const RECEIVE_COMPANY = 'RECEIVE_COMPANY';
export const RECEIVE_COMPANIES = 'RECEIVE_COMPANIES';
export const RECEIVE_DATA = 'RECEIVE_DATA';
export const RECEIVE_USER_STOCK_DATA = 'RECEIVE_USER_STOCK_DATA';
export const RECEIVE_PORT_DATA = 'RECEIVE_PORT_DATA';
export const RECEIVE_RECENT_STOCK_DATA = 'RECEIVE_RECENT_STOCK_DATA';

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

export const sendPortData = data => ({
    type: RECEIVE_PORT_DATA,
    data
});

export const receiveRecentStockData = data => ({
    type: RECEIVE_RECENT_STOCK_DATA,
    data
});


export const fetchCompanies = () => dispatch => (
    CompUtils.fetchCompanies().then(companies => dispatch(receiveCompanies(companies)))
);

export const fetchCompany = id => dispatch => (
    CompUtils.fetchCompany(id).then(company => dispatch(receiveCompany(company)), errors => dispatch(receiveErrors(errors)))
);

export const createCompany = company => dispatch => (
    CompUtils.createCompany(company)
    .then(company => dispatch(receiveCompany(company)),
    errors => dispatch(receiveErrors(errors)))
);

export const getStockData = (ticker, time) => dispatch => {
    return CompUtils.getStockData(ticker, time).then(data => dispatch(receiveStockData(ticker, data)))
};

export const getRecentStockData = (ticker, time) => dispatch => {
    return CompUtils.getStockData(ticker, time).then(data => dispatch(receiveRecentStockData(ticker, data)))
};


