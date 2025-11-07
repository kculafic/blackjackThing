class Card < ApplicationRecord
  SUITS = %w[hearts diamonds clubs spades].freeze
  RANKS = %w[A 2 3 4 5 6 7 8 9 10 J Q K].freeze

  validates :suit, presence: true, inclusion: { in: SUITS }
  validates :rank, presence: true, inclusion: { in: RANKS }

  def value
    case rank
    when 'A'
      11
    when 'J', 'Q', 'K'
      10
    else
      rank.to_i
    end
  end

  def display_name
    "#{rank} of #{suit}"
  end
end

# == Schema Information
#
# Table name: cards
#
#  id         :bigint           not null, primary key
#  suit       :string           not null
#  rank       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#   
