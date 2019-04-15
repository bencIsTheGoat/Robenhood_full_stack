export const fetchWatchListIndex = () => (
    $.ajax({
        method: 'GET',
        url: '/api/watchlists'
    })
)

export const createWatchListItem = (item) => (
    $.ajax({
        method: 'POST',
        url: '/api/watchlists',
        data: {item}
    })
)

export const deleteWatchListItem = (id) => (
    $.ajax({
        method: 'DELETE',
        url: `api/watchlists/${id}`,
        id: id
    })
)