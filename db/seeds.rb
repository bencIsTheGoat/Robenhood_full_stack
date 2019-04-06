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

csv_text = File.read(Rails.root.join('lib', 'companylist.csv'))
csv = CSV.parse(csv_text, :headers => true, :encoding => 'ISO-8859-1')
csv.each do |row|
    company = Company.create(ticker: row['ticker'], name: row['name'])
    
end
puts Company.count

anna = User.create(email: 'anna@gmail.com', password: '123456', first_name: 'anna', last_name: 'demo')

User.create(email: 'demo@robenhood.com', password: 'robenhood', first_name: 'demo', last_name: 'user')

Transaction.create(transaction_type: 'buy', company_id: 50086, price: 100, shares: 25, user_id: anna.id)

Transaction.create(transaction_type: 'buy', company_id: 51430, price: 100, shares: 25, user_id: anna.id)
