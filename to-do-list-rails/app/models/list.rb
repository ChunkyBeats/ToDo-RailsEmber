class List < ActiveRecord::Base
  has_many :todos, dependent: :destroy

  validates :title, presence: true
end
