class LoadGroup < ActiveRecord::Migration
  def self.up
    group = Group.new(
      :name => 'homeez',
      :owner => User.find_by_username('shadow'),
      :users => [
        User.find_by_username('matterhorn'),
        User.find_by_username('gruff')
      ]
    )
    group.save!
  end

  def self.down
    Group.find_by_name('homeez').destroy
  end
end
