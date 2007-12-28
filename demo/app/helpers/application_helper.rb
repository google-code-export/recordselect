# Methods added to this helper will be available to all templates in the application.
module ApplicationHelper
  def expose_params
    content_tag 'p', :id => 'params' do
      content_tag('h5', 'Posted Params:') +
      params.reject {|k,v| [:action, :controller, :_method, :commit].include? k.to_sym}.inspect
    end
  end
end
