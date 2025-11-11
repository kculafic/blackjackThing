class GamesController < ApplicationController
  def create
    game = Game.start_new_game(
      starting_balance: params[:starting_balance] || 100,
      bet_amount: params[:bet_amount] || 5
    )

    render json: game_state(game), status: :created
  end

  def show
    game = Game.find(params[:id])
    render json: game_state(game)
  end

  def hit
    game = Game.find(params[:id])
    game.hit
    render json: game_state(game)
  end

  def stand
    game = Game.find(params[:id])
    game.stand
    render json: game_state(game)
  end

  private

  def game_state(game)
    dealer_cards = game.dealer_hand.cards
    dealer_value = game.dealer_hand.calculate_value

    # Hide dealer's second card during active play
    if game.status == 'in_progress'
      dealer_cards = [
        dealer_cards.first,
        { suit: 'hidden', rank: 'hidden' }
      ]
      # Calculate value of only the visible card
      dealer_value = calculate_card_value(dealer_cards.first)
    end

    {
      id: game.id,
      status: game.status,
      player_balance: game.player_balance,
      bet_amount: game.bet_amount,
      player_hand: {
        cards: game.player_hand.cards,
        value: game.player_hand.calculate_value
      },
      dealer_hand: {
        cards: dealer_cards,
        value: dealer_value
      }
    }
  end

  def calculate_card_value(card)
    rank = card['rank'] || card[:rank]
    case rank
    when 'A'
      11
    when 'J', 'Q', 'K'
      10
    else
      rank.to_i
    end
  end
end
