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

# == Schema Information
#
# Table name: games
#  id             :bigint           not null, primary key
#  status         :string           default("ongoing"), not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  deck_id        :bigint           not null
#  player_hand_id :bigint           not null
#  dealer_hand_id :bigint           not null
# Indexes
#  index_games_on_dealer_hand_id  (dealer_hand_id)
#  index_games_on_deck_id         (deck_id)
#  index_games_on_player_hand_id  (player_hand_id)
# Foreign Keys
#  fk_rails_...  (dealer_hand_id => hands.id)
#  fk_rails_...  (deck_id => decks.id)
#  fk_rails_...  (player_hand_id => hands.id)
