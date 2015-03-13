RecordSelect is a Rails widget to help you pick one record out of many. I designed it as a more usable and performant alternative to generating a massive dropdown list. It relies on AJAX for the cooler uses (all the provided view helpers rely on JavaScript) but can also function in a pure-http fashion (although multi-select support is provided in a pure-JavaScript implementation).

Go ahead and [check out the demo app](Demo.md) to really see how it works! Or go straight to [installing the plugin into your own app](Install.md).

### DEPENDENCIES ###
This depends on the excellent Paginator gem by Bruce Williams. This simple gem is available at http://paginator.rubyforge.org.