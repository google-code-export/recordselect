class UsersController < ApplicationController
  record_select :per_page => 5, :search_on => [:first_name, :last_name], :order_by => 'last_name ASC, first_name ASC'

  def index
    render :nothing => true, :layout => true
  end

  def ajax
    respond_to do |wants|
      wants.html {render :action => 'ajax'}
      wants.js {render :action => 'link', :layout => false}
    end
  end
end
