ActionController::Routing::Routes.draw do |map|
  map.connect '', :controller => 'demo', :action => 'index'
  map.form 'form-helper', :controller => 'demo', :action => 'form'
  map.link 'link-helper', :controller => 'demo', :action => 'link'
  map.ajax 'ajax-loading', :controller => 'demo', :action => 'ajax'

  map.connect 'users/:action/:id', :controller => 'users'
end
