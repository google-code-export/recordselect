# Introduction #

RecordSelect (RS) isn't just an ActiveScaffold (AS) add-on. It is, however, useful in AS. This HOWTO assumes you've already installed the plugin and included the CSS and JavaScript in your layout (see [Install](Install.md) for details).

# HOWTO #

Let's assume that you have two models, NewsArticles and Authors, and every NewsArticle belongs\_to :author. Let's assume that your goal is to set up the scaffold for NewsArticles so that the create/update forms use RecordSelect to pick the appropriate Author. To accomplish this using the default intelligence of these two plugins, you need to do two things:

  1. Configure RecordSelect on the **AuthorsController**.
  1. Configure the NewsArticles scaffold with `config.columns[:author].form_ui = :record_select`.
  1. If you want to use both RESTfully, combine the configuration in your routes.rb: `map.resources :news, :active_scaffold => true, :collection => {:browse => :get}, :member => {:select => :post}`

It's important to understand that the relationship between the two models is mirrored between the two controllers. The NewsArticlesController will display a form that calls RecordSelect via `/authors/browse`. If you want to customize which authors are returned in the result set (e.g. change the number of authors per-page), you need to configure RecordSelect on the AuthorsController.