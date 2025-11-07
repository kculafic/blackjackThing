class Game < ApplicationRecord
  belongs_to :deck
  belongs_to :player_hand, class_name: 'Hand'
  belongs_to :dealer_hand, class_name: 'Hand'

  after_create :deal_initial_cards

  def deal_initial_cards
    2.times do
      player_hand.add_card(deck.draw)
      dealer_hand.add_card(deck.draw)
    end
    player_hand.save
    dealer_hand.save
    check_for_blackjack
  end

  def check_for_blackjack
    if player_hand.calculate_value == 21
      self.status = 'player_blackjack'
      save
    end
  end
end
