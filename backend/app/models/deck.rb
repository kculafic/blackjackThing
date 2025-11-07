class Deck < ApplicationRecord
  after_initialize :generate_cards, if: :new_record?

  def generate_cards
    self.cards = []
    Card::SUITS.each do |suit|
      Card::RANKS.each do |rank|
        self.cards << { suit: suit, rank: rank }
      end
    end
  end

  def shuffle!
    self.cards.shuffle!
    save
  end

  def draw
    cards.shift
  end
end

# == Schema Information
#
# Table name: decks
#  id         :bigint           not null, primary key
#  cards      :jsonb          default([]), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
