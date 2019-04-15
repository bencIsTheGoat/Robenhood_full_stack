class CreateWatchlists < ActiveRecord::Migration[5.2]
  def change
    create_table :watchlists do |t|
      t.integer :user_id, null: false
      t.integer :company_id, null: false
      t.string :ticker, null: false
    end
    add_index :watchlists, :user_id
    add_index :watchlists, :company_id
    add_index :watchlists, :ticker
  end
end
