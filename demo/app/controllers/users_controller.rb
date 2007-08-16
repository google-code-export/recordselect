class UsersController < ApplicationController
  record_select :per_page => 5,
                :search_on => [:first_name, :last_name],
                :order_by => 'last_name ASC, first_name ASC',
                :full_text_search => true
end
