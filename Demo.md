RecordSelect's repository includes a demo application for you to play with. The demo provides good examples of how it can be used and how to use it. It includes:
  * a sample usage of the form helper
  * a sample usage of the link\_to helper
  * proof that RecordSelect loads from a partial retrieved via AJAX
  * an example of HTML record descriptions

## Online Demo ##
The demo is actually hosted online now at http://recordselect.codelevy.com/. Go there and browse around, or if you want to see how it's set up, proceed with installing the demo on your own computer.

## Installing the Demo ##
  1. grab the demo from Subversion
> > `svn co http://recordselect.googlecode.com/svn/demo record_select_demo`
  1. set up the database
> > Copy config/database.yml.example to database.yml and set yourself up. Sqlite3 is great for this kind of stuff!
  1. run the migrations
> > `rake db:migrate`
  1. make sure you have the Paginator gem installed
> > `gem install paginator -y`
  1. start the server and play around

