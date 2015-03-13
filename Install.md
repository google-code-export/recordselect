## PREPARING ##
  1. Install Paginator
> > `sudo gem install paginator`
  1. Make sure you are including Prototype from your layout:
> > `<%= javascript_include_tag :defaults %>`

## INSTALL ##
  1. [Download from GitHub](http://github.com/cainlevy/recordselect/zipball/master) and unzip into vendor/plugins.
  1. Then add the CSS and JavaScript to your layout by including the following line:
> > `<%= record_select_includes %>`
  1. [Enable and configure it on a controller.](ControllerSetup.md)
> > `class UsersController < ApplicationController`
> > > `record_select :per_page => 5, :search_on => 'username'`

> > `end`
  1. Optional: to use RecordSelect RESTfully, add the following to your routes.rb:
> > `map.resources :model_id, :collection => {:browse => :get}, :member => {:select => :post}`
  1. Now go ahead and [use it somewhere.](HelperExamples.md)