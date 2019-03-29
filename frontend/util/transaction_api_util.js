export const fetchTransactions = () => (
    $.ajax({
        method: 'GET',
        url: 'api/transactions'
    })
);

export const createTransaction = transaction => (
    $.ajax({
        method: 'POST',
        url: 'api/transactions',
        data: {transaction}
    })
);