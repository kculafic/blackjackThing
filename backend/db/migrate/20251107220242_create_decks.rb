class CreateDecks < ActiveRecord::Migration[8.1]
  def change
    create_table :decks do |t|
      t.json :cards

      t.timestamps
    end
  end
end
