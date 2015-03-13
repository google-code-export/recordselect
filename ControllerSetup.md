RecordSelect configures through one method with optional arguments, like this:

```
class UsersController < ApplicationController
  record_select :search_on => [:first_name, last_name]
end
```

The options you can pass are:

  * **:model**: the name of the model you want to expose. defaults based on the name of the controller
  * **:per\_page**: how many records to show per page when browsing
  * **:notify**: a method name to invoke when a record has been selected, if you want server-side notification.
  * **:order\_by**: a SQL string to order the search results
  * **:search\_on**: a field name, or an array of field names. these fields will each be matched against each search term.
  * **:full\_text\_search**: a boolean for whether to use a %?% search pattern or not. default is false.
  * **:label**: a proc that accepts a record and returns a descriptive string. the default one calls :to\_label on the record.
  * **:include**: as for ActiveRecord::Base#find. can help with search conditions or just help optimize rendering the results.


