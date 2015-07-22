class ListSerializer < ActiveModel::Serializer
  embed :ids, embed_in_root: true

  attributes :id, :title

  has_many :todos
end
