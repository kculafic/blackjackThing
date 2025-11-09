class AddBettingToGames < ActiveRecord::Migration[8.1]
  def change
    add_column :games, :bet_amount, :decimal, precision: 10, scale: 2, default: 0
    add_column :games, :player_balance, :decimal, precision: 10, scale: 2, default: 100
  end
end
