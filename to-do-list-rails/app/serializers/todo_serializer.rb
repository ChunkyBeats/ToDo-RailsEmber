class TodoSerializer < ActiveModel::Serializer
  attributes :id, :title, :is_completed

  belongs_to :list
end
