class Game < ApplicationRecord
  belongs_to :deck
  belongs_to :player_hand, class_name: 'Hand'
  belongs_to :dealer_hand, class_name: 'Hand'

  after_create :deal_initial_cards

  # Class method to encapsulate game creation logic
  def self.start_new_game(starting_balance: 100, bet_amount: 5)
    # Create and shuffle deck
    deck = Deck.create
    deck.shuffle!

    # Create hands for player and dealer
    player_hand = Hand.create
    dealer_hand = Hand.create

    # Create game with initial state
    create(
      deck: deck,
      player_hand: player_hand,
      dealer_hand: dealer_hand,
      status: 'in_progress',
      player_balance: starting_balance.to_f - bet_amount.to_f,
      bet_amount: bet_amount.to_f
    )
  end

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
      self.player_balance += (bet_amount * 2.5)
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
      self.player_balance += (bet_amount * 2)
    elsif player_value > dealer_value
      self.status = 'player_wins'
      self.player_balance += (bet_amount * 2)
    elsif dealer_value > player_value
      self.status = 'dealer_wins'
    else
      self.status = 'push'
      self.player_balance += bet_amount
    end

    save
  end
end
