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