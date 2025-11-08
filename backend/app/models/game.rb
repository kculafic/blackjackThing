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

  def hit
    card = deck.draw
    player_hand.add_card(card)
    player_hand.save

    if player_hand.calculate_value > 21
      self.status = 'player_busted'
      save
    end
  end

  def stand
    self.status = 'player_stood'
    save
    dealer_play
  end

  def dealer_play
    while dealer_hand.calculate_value < 17
      dealer_hand.add_card(deck.draw)
      dealer_hand.save
    end

    determine_winner
  end

  def determine_winner
    player_value = player_hand.calculate_value
    dealer_value = dealer_hand.calculate_value

    if dealer_value > 21
      self.status = 'player_wins'
    elsif player_value > dealer_value
      self.status = 'player_wins'
    elsif dealer_value > player_value
      self.status = 'dealer_wins'
    else
      self.status = 'push'
    end

    save
  end
end
