@watchlist_items.each do |watchlist_item|
    json.set! watchlist_item.id do 
        json.set! :id, watchlist_item.id
        json.set! :user_id, watchlist_item.user_id
        json.set! :company_id, watchlist_item.company_id
        json.set! :ticker, watchlist_item.ticker
    end
end