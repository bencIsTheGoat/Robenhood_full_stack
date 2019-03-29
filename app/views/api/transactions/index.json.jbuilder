@transactions.each do |transaction|
    json.extract! transaction, :id, :user_id, :company_id, :transaction_type, :price, :shares
end