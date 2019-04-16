# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'csv'

Company.delete_all
Transaction.delete_all
User.delete_all

csv_text = File.read(Rails.root.join('lib', 'newcomplist.csv'))
csv = CSV.parse(csv_text, :headers => true, :encoding => 'ISO-8859-1')
csv.each do |row|
    company = Company.create(ticker: row['ticker'], name: row['name'])
    
end

anna = User.create(email: 'anna@gmail.com', password: '123456', first_name: 'michael', last_name: 'bloomberg')


apple = Company.find_by(ticker: 'AAPL')
google = Company.find_by(ticker: 'GOOG')
amazon = Company.find_by(ticker: 'AMZN')
boa = Company.find_by(ticker: 'BAC')
jpm = Company.find_by(ticker: 'JPM')
facebook = Company.find_by(ticker: 'FB')


record_timestamps = false
Transaction.create(transaction_type: 'buy', company_id: apple.id, price: 100, shares: 50, user_id: anna.id, created_at: 3.years.ago)
Transaction.create(transaction_type: 'buy', company_id: google.id, price: 100, shares: 10, user_id: anna.id, created_at: 3.years.ago)
Transaction.create(transaction_type: 'buy', company_id: amazon.id, price: 100, shares: 10, user_id: anna.id, created_at: 3.years.ago)
Transaction.create(transaction_type: 'buy', company_id: boa.id, price: 100, shares: 50, user_id: anna.id, created_at: 3.years.ago)
Transaction.create(transaction_type: 'buy', company_id: facebook.id, price: 100, shares: 25, user_id: anna.id, created_at: 3.years.ago)
record_timestamps = true

spotify = Company.find_by(ticker: 'SPOT')
icon = Company.find_by(ticker: 'ICLR')
snap = Company.find_by(ticker: 'SNAP')
boeing = Company.find_by(ticker: 'BA')
netflix = Company.find_by(ticker: 'NFLX')

Watchlist.create(company_id: spotify.id, user_id: anna.id, ticker: spotify.ticker.downcase)
Watchlist.create(company_id: icon.id, user_id: anna.id, ticker: icon.ticker.downcase)
Watchlist.create(company_id: snap.id, user_id: anna.id, ticker: snap.ticker.downcase)
Watchlist.create(company_id: boeing.id, user_id: anna.id, ticker: boeing.ticker.downcase)
Watchlist.create(company_id: netflix.id, user_id: anna.id, ticker: netflix.ticker.downcase)
puts Company.count