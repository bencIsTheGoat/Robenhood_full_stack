class Company < ApplicationRecord
    validates :name, :ticker, presence: true

    has_many :transactions

    has_many :watchlists
end