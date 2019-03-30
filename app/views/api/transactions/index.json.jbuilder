json.array!(@transactions) do |trans|
    json.id trans.id
    json.user_id trans.user_id
    json.company_id trans.company_id
    json.transaction_type trans.transaction_type
    json.price trans.price
    json.shares trans.shares
    json.date trans.created_at
end