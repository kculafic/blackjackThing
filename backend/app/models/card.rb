class Card < ApplicationRecord
  SUITS = %w[hearts diamonds clubs spades].freeze
  RANKS = %w[A 2 3 4 5 6 7 8 9 10 J Q K].freeze
end
