**record\_select\_field**

```
<% form_tag do %>
  Amount: <%= text_field_tag 'amount' %><br />
  Description: <%= text_field_tag 'description' %><br />
  User: <%= record_select_field 'user', selected_user || User.new %><br />
<% end %>
```

**record\_multi\_select\_field**

```
<% form_tag do %>
  Amount: <%= text_field_tag 'amount' %><br />
  Description: <%= text_field_tag 'description' %><br />
  User: <%= record_multi_select_field 'user', @current, :controller => 'users' %><br />
<% end %>
```

**link\_to\_record\_select**

```
<%= link_to_record_select 'Pick A User', 'users', :onselect => "alert('You picked ' + label + ', id#' + id);" %>
```

You can see these examples in action in the [demo](demo.md).
