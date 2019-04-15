json.array!(@watchlist_items) do |watchlist_item|
    debugger
    json.id watchlist_item.id
    json.user_id watchlist_item.user_id
    json.company_id watchlist_item.company_id
    json.ticker watchlist_item.ticker
end