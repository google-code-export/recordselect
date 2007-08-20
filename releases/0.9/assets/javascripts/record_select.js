Event.observe(window, 'load', function() {RecordSelect.document_loaded = true});

var RecordSelect = new Object();
RecordSelect.document_loaded = false;

RecordSelect.notify = function(item) {
  var e = Element.up(item, '.record-select-handler');
  var onselect = e.onselect || e.getAttribute('onselect');
  if (typeof onselect != 'function') onselect = eval(onselect);
  if (onselect)
  {
    try {
      onselect(item.parentNode.id.substr(2), item.innerHTML, e);
    } catch(e) {
      alert(e);
    }
    return false;
  }
  else return true;
}

RecordSelect.Abstract = Class.create();
Object.extend(RecordSelect.Abstract.prototype, {
  /**
   * obj - the id or element that will anchor the recordselect to the page
   * url - the url to run the recordselect
   * options - ??? (check concrete classes)
   */
  initialize: function(obj, url, options) {
    this.obj = $(obj);
    this.url = url;
    this.options = options;
    this.container;

    if (RecordSelect.document_loaded) this.onload();
    else Event.observe(window, 'load', this.onload.bind(this));
  },

  /**
   * Finish the setup - IE doesn't like doing certain things before the page loads
   * --override--
   */
  onload: function() {},

  /**
   * the onselect event handler - when someone clicks on a record
   * --override--
   */
  onselect: function(id, value) {
    alert(id + ': ' + value);
  },

  /**
   * opens the recordselect
   */
  open: function() {
    if (this.is_open()) return;

    new Ajax.Updater(this.container, this.url, {
      evalScripts: true,
      asynchronous: true,
      insertion: Insertion.Bottom,
      onSuccess: function() {
        this.show();
        Element.observe(document.body, 'click', this.onbodyclick.bindAsEventListener(this));
      }.bind(this)
    });
  },

  /**
   * positions and reveals the recordselect
   */
  show: function() {
    var offset = Position.cumulativeOffset(this.obj);
    this.container.style.left = offset[0] + 'px';
    this.container.style.top = (Element.getHeight(this.obj) + offset[1]) + 'px';

    this.container.show();
  },

  /**
   * closes the recordselect by emptying the container
   */
  close: function() {
    this.container.hide();
    // hopefully by using remove() instead of innerHTML we won't leak memory
    this.container.immediateDescendants().invoke('remove');
  },

  /**
   * returns true/false for whether the recordselect is open
   */
  is_open: function() {
    return (this.container.childNodes.length > 0)
  },

  /**
   * when the user clicks outside the dropdown
   */
  onbodyclick: function(ev) {
    if (!this.is_open()) return;
    var elem = $(Event.element(ev));
    var ancestors = elem.ancestors();
    ancestors.push(elem);
    if (ancestors.include(this.container) || ancestors.include(this.obj)) return;
    this.close();
  },

  /**
   * creates and initializes (and returns) the recordselect container
   */
  create_container: function() {
    new Insertion.Bottom(document.body, '<div class="record-select-container record-select-handler"></div>');
    e = document.body.childNodes[document.body.childNodes.length - 1];
    e.onselect = this.onselect.bind(this);
    e.style.display = 'none';

    return $(e);
  }
});

/**
 * Adds keyboard navigation to RecordSelect objects
 */
Object.extend(RecordSelect.Abstract.prototype, {
  current: null,

  /**
   * keyboard navigation - where to intercept the keys is up to the concrete class
   */
  onkeypress: function(ev) {
    var elem;
    switch (ev.keyCode) {
      case Event.KEY_UP:
        if (this.current && this.current.up('.record-select')) elem = this.current.previous();
        if (!elem) elem = this.container.getElementsBySelector('ol li.record').last();
        this.highlight(elem);
        break;
      case Event.KEY_DOWN:
        if (this.current && this.current.up('.record-select')) elem = this.current.next();
        if (!elem) elem = this.container.getElementsBySelector('ol li.record').first();
        this.highlight(elem);
        break;
      case Event.KEY_SPACE:
      case Event.KEY_RETURN:
        if (this.current) this.current.down('a').onclick();
        break;
      case Event.KEY_RIGHT:
        elem = this.container.down('li.pagination.next');
        if (elem) elem.down('a').onclick();
        break;
      case Event.KEY_LEFT:
        elem = this.container.down('li.pagination.previous');
        if (elem) elem.down('a').onclick();
        break;
      case Event.KEY_ESC:
        this.close();
        break;
    }
  },

  /**
   * moves the highlight to a new object
   */
  highlight: function(obj) {
    if (this.current) this.current.removeClassName('current');
    this.current = $(obj);
    obj.addClassName('current');
  }
});

/**
 * Used by link_to_record_select
 * The options hash should contain a onselect: key, with a javascript function as value
 */
RecordSelect.Dialog = Class.create();
RecordSelect.Dialog.prototype = Object.extend(new RecordSelect.Abstract(), {
  onload: function() {
    this.container = this.create_container();
    this.obj.observe('click', this.toggle.bind(this));

    if (this.onkeypress) this.obj.observe('keyup', this.onkeypress.bind(this));
  },

  onselect: function(id, value) {
    if (this.options.onselect(id, value) != false) this.close();
  },

  toggle: function() {
    if (this.is_open()) this.close();
    else this.open();
  }
});

/**
 * Used by record_select_field helper
 * The options hash may contain id: and label: keys, designating the current value
 */
RecordSelect.Autocomplete = Class.create();
RecordSelect.Autocomplete.prototype = Object.extend(new RecordSelect.Abstract(), {
  onload: function() {
    // create the hidden input
    new Insertion.After(this.obj, '<input type="hidden" name="" value="" />')
    this.hidden_input = this.obj.next();

    // transfer the input name from the text input to the hidden input
    this.hidden_input.name = this.obj.name;
    this.obj.name = '';

    // initialize the values
    this.set(this.options.id, this.options.label);

    // initialize the container
    this.container = this.create_container();
    this.container.addClassName('record-select-autocomplete');

    // attach the events to start this party
    this.obj.observe('focus', this.open.bind(this));

    // the autosearch event
    this.obj.observe('keyup', function() {
      if (!this.is_open()) return;
      this.container.down('.text-input').value = this.obj.value;
    }.bind(this));

    if (this.onkeypress) this.obj.observe('keyup', this.onkeypress.bind(this));
  },

  onselect: function(id, value) {
    this.set(id, value);
    this.close();
  },

  /**
   * sets the id/label
   */
  set: function(id, label) {
    this.obj.value = label;
    this.hidden_input.value = id;
  }
});

TextFieldWithExample = Class.create();
TextFieldWithExample.prototype = {
  initialize: function(inputElementId, defaultText, options) {
    this.setOptions(options);

    this.input = $(inputElementId);
    this.name = this.input.name;
    this.defaultText = defaultText;
    this.createHiddenInput();

    this.checkAndShowExample();

    Event.observe(this.input, "blur", this.onBlur.bindAsEventListener(this));
    Event.observe(this.input, "focus", this.onFocus.bindAsEventListener(this));
    Event.observe(this.input, "select", this.onFocus.bindAsEventListener(this));
    Event.observe(this.input, "keydown", this.onKeyPress.bindAsEventListener(this));
    Event.observe(this.input, "click", this.onClick.bindAsEventListener(this));
  },
  createHiddenInput: function() {
    this.hiddenInput = document.createElement("input");
    this.hiddenInput.type = "hidden";
    this.hiddenInput.value = "";
    this.input.parentNode.appendChild(this.hiddenInput);
  },
  setOptions: function(options) {
      this.options = { exampleClassName: 'example' };
      Object.extend(this.options, options || {});
    },
  onKeyPress: function(event) {
    if (!event) var event = window.event;
    var code = (event.which) ? event.which : event.keyCode
    if (this.isAlphanumeric(code)) {
      this.removeExample();
    }
  },
  onBlur: function(event) {
    this.checkAndShowExample();
  },
  onFocus: function(event) {
    if (this.exampleShown()) {
        this.removeExample();
      }
  },
  onClick: function(event) {
    this.removeExample();
  },
  isAlphanumeric: function(keyCode) {
    return keyCode >= 40 && keyCode <= 90;
  },
  checkAndShowExample: function() {
    if (this.input.value == '') {
      this.input.value = this.defaultText;
      this.input.name = null;
      this.hiddenInput.name = this.name;
      Element.addClassName(this.input, this.options.exampleClassName);
    }
  },
  removeExample: function() {
    if (this.exampleShown()) {
      this.input.value = '';
      this.input.name = this.name;
      this.hiddenInput.name = null;
      Element.removeClassName(this.input, this.options.exampleClassName);
    }
  },
  exampleShown: function() {
    return Element.hasClassName(this.input, this.options.exampleClassName);
  }
}