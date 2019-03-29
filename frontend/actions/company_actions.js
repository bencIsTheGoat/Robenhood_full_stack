import * as CompUtils from '../util/company_api_util';
import {receiveErrors } from './session_actions';

export const RECEIVE_COMPANY = 'RECEIVE_COMPANY';

export const receiveCompany = company => ({
    type: RECEIVE_COMPANY,
    company
});

export const fetchCompany = id => dispatch => (
    CompUtils.fetchCompany(id).then(company => dispatch(receiveCompany(company)),
    errors => dispatch(receiveErrors(errors)))
);

export const createCompany = company => dispatch => (
    CompUtils.createCompany(company).then(company => dispatch(receiveCompany(company)),
    errors => dispatch(receiveErrors(errors)))
);