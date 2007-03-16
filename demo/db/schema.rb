# This file is autogenerated. Instead of editing this file, please use the
# migrations feature of ActiveRecord to incrementally modify your database, and
# then regenerate this schema definition.

ActiveRecord::Schema.define(:version => 2) do

  create_table "users", :force => true do |t|
    t.column "username",   :string
    t.column "first_name", :string
    t.column "last_name",  :string
    t.column "admin",      :boolean
    t.column "created_on", :datetime
  end

end
