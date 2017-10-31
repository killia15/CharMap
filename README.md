# CharMap

Simple JavaScript library using jQuery to render character maps above a textbox when a key is held down.

## Author

* **Seth Killian** - *Initial work*


## To Do List

* Fix horizontal positioning to take into account text font, size, and carot position. Also, make vertical positioning more reliable, using something similar to positioning algorithmns by tooltips.

* Allow user to change positioning to be above or below textbox.

* Change CharMap size to be relative to the size of the textbox its attached to.

* Allow for customization of color instead of only light blue.

* Only require lower case of letters on mappings rather than both, and decide during rendering if the character typed was lower or upper case, and then render appropriate case using .toUpperCase() or .toLowerCase()

* Close CharMap on key press and revert back to original character.
