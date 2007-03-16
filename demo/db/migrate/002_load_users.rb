class LoadUsers < ActiveRecord::Migration
  def self.up
    User.new(:username => 'jerry', :first_name => 'Jerry', :last_name => 'Smith').save
    User.new(:username => 'shadow', :first_name => 'Sam', :last_name => 'Dickerson').save
    User.new(:username => 'catgrl', :first_name => 'Sara', :last_name => 'Nowatte').save
    User.new(:username => 'cain', :first_name => 'Cain', :last_name => 'Levy').save
    User.new(:username => 'flier', :first_name => 'Fred', :last_name => 'Swallow').save
    User.new(:username => 'hazel', :first_name => 'Hazel', :last_name => 'Dickerson').save
    User.new(:username => 'matterhorn', :first_name => 'Hulk', :last_name => 'Jones').save
    User.new(:username => 'bud', :first_name => 'Billy', :last_name => 'Edwards').save
    User.new(:username => 'gruff', :first_name => 'Boy', :last_name => 'Jones').save
    User.new(:username => 'molly', :first_name => 'Molly', :last_name => 'Mitchell').save
    User.new(:username => 'sugarnspice', :first_name => 'Tammy', :last_name => 'Rallins').save
    User.new(:username => 'charity', :first_name => 'Charity', :last_name => 'Stucke').save
  end

  def self.down
    User.delete_all
  end
end
