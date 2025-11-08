class GamesController < ApplicationController
  def create
    deck = Deck.create
    deck.shuffle!

    player_hand = Hand.create
    dealer_hand = Hand.create

    game = Game.create(
      deck: deck,
      player_hand: player_hand,
      dealer_hand: dealer_hand,
      status: 'in_progress'
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
    {
      id: game.id,
      status: game.status,
      player_hand: {
        cards: game.player_hand.cards,
        value: game.player_hand.calculate_value
      },
      dealer_hand: {
        cards: game.dealer_hand.cards,
        value: game.dealer_hand.calculate_value
      }
    }
  end
end
