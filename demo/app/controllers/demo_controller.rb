class DemoController < ApplicationController
  def ajax
    respond_to do |wants|
      wants.html {render :action => 'ajax'}
      wants.js {render :action => 'link', :layout => false}
    end
  end

  def multi
    @current = User.find(:all, :limit => 2)
  end
end