# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.1].define(version: 2025_11_09_193232) do
  create_table "cards", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "rank"
    t.string "suit"
    t.datetime "updated_at", null: false
  end

  create_table "decks", force: :cascade do |t|
    t.json "cards"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "games", force: :cascade do |t|
    t.decimal "bet_amount", precision: 10, scale: 2, default: "0.0"
    t.datetime "created_at", null: false
    t.integer "dealer_hand_id"
    t.integer "deck_id"
    t.decimal "player_balance", precision: 10, scale: 2, default: "100.0"
    t.integer "player_hand_id"
    t.string "status"
    t.datetime "updated_at", null: false
    t.index ["dealer_hand_id"], name: "index_games_on_dealer_hand_id"
    t.index ["deck_id"], name: "index_games_on_deck_id"
    t.index ["player_hand_id"], name: "index_games_on_player_hand_id"
  end

  create_table "hands", force: :cascade do |t|
    t.json "cards"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "games", "decks"
  add_foreign_key "games", "hands", column: "dealer_hand_id"
  add_foreign_key "games", "hands", column: "player_hand_id"
end
