class Watchlist < ApplicationRecord
    validates :user_id, :company_id, :ticker, presence: true

    belongs_to :user
    belongs_to :company
end