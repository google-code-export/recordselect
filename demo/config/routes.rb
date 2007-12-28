ActionController::Routing::Routes.draw do |map|
  map.connect '', :controller => 'demo', :action => 'index'

  # the users recordselect controller
  map.resources :users, :collection => { :browse => :get }, :member => { :select => :post }

  # misc demos
  map.link 'link-helper', :controller => 'demo', :action => 'link'
  map.ajax 'ajax-loading', :controller => 'demo', :action => 'ajax'

  # form demos
  map.resources :groups
end
