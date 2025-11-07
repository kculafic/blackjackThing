class CreateGames < ActiveRecord::Migration[8.1]
  def change
    create_table :games do |t|
      t.string :status
      t.references :deck, foreign_key: true
      t.references :player_hand, foreign_key: { to_table: :hands }
      t.references :dealer_hand, foreign_key: { to_table: :hands }

      t.timestamps
    end
  end
end
