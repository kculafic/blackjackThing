class CreateHands < ActiveRecord::Migration[8.1]
  def change
    create_table :hands do |t|
      t.json :cards

      t.timestamps
    end
  end
end
