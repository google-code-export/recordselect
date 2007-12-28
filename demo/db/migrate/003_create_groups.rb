class CreateGroups < ActiveRecord::Migration
  def self.up
    create_table :groups do |t|
      t.column :name, :string
      t.column :owner_id, :integer, :null => false
    end
    add_index :groups, :owner_id

    create_table :groups_users, :id => false do |t|
      t.column :group_id, :integer, :null => false
      t.column :user_id, :integer, :null => false
    end
    add_index :groups_users, :group_id
    add_index :groups_users, :user_id
  end

  def self.down
    drop_table :groups
    drop_table :groups_users
  end
end
