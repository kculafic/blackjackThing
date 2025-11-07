class Hand < ApplicationRecord
  after_initialize :initialize_cards, if: :new_record?

  def initialize_cards
    self.cards ||= []
  end

  def add_card(card)
    self.cards << card
  end

  def calculate_value
    total = 0
    aces = 0

    cards.each do |card|
      rank = card['rank'] || card[:rank]

      case rank
      when 'A'
        aces += 1
        total += 11
      when 'J', 'Q', 'K'
        total += 10
      else
        total += rank.to_i
      end
    end

    while total > 21 && aces > 0
      total -= 10
      aces -= 1
    end

    total
  end
end
