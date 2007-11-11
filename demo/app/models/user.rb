class User < ActiveRecord::Base
  validates_presence_of :username
  validates_presence_of :first_name
  validates_presence_of :last_name

  def to_label
    "#{last_name}, #{first_name}"
  end
end
