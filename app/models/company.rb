class Company < ApplicationRecord
    validates :name, :ticker, presence: true

    has_many :transactions
end