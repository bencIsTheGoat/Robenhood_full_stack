class Transaction < ApplicationRecord
    validates :user_id, :company_id, :transaction_type, :price, :shares, presence: true

    belongs_to :user
    belongs_to :company

end