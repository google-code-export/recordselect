# Introduction #

The [demo](Demo.md) uses HTML to spice up the RecordSelect entries. This quick walk-through will tell you how to do the same.

# Details #

# Create a partial for the controller running the RecordSelect. This partial will replace the simple record label that RecordSelect normally uses. Make sure that some part of the partial contains a 

&lt;label&gt;

 tag. The contents of the 

&lt;label&gt;

 tag will be used in places that don't support HTML, like in the text field.
```
  <div class="user_description">
    <%= image_tag "avatar#{(rand * 1000).to_i % 4}.jpg" %>
    <p>
      <%= record.username %>
      <label><%= record.last_name %>, <%= record.first_name %></label>
    </p>
  </div>
```

# Configure your controller by configuring the :label option to name the partial you just created.
> `record_select :label => 'user_description'`

# The End. Wasn't that easy?