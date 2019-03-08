class Character < ApplicationRecord
  has_many :quotes, dependent: :destroy
end
