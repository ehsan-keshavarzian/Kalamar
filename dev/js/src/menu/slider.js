/**
 * Create slider for menus.
 * The slider will only be used by mouse - touch support
 * shouldn't be necessary, as the menu can be scrolled using touch.
 *
 * @author Nils Diewald
 */
define({

  /**
   * Create new slider for Menu.
   * @this {Slider}
   * @constructor
   * @param {Menu} menu object
   */
  create : function (menu) {
    return Object.create(this)._init(menu);
  },

  /**
   * Length attribute of the slider
   * (as number of items).
   *
   * @param {number} Number of items (optional)
   */
  length : function (i) {
    if (arguments.length === 0)
      return this._length;
    if (i == this._length)
      return this;
    this._length = i;
    return this;
  },

  /**
   * Limit of items per screen.
   *
   * @param {number} Number of items per screen (optional)
   */
  limit : function (i) {
    if (arguments.length === 0)
      return this._limit;
    if (i == this._limit)
      return this;
    this._limit = i;
    return this;
  },

  /**
   * Is the slider active or not.
   *
   * @param {bool} true or false (optional)
   */
  active : function (bool) {
    if (arguments.length === 1) {
      if (bool) {
	if (!this._active) {
	  this._element.classList.add('active');
	  this._active = true;
	};
      }
      else if (this._active) {
	this._element.classList.remove('active');
	this._active = false;
      }
    };
    return this._active;
  },

  /**
   * Move the slider to a relative position
   *
   * @param {number} relative position
   */
  movetoRel : function (relativePos) {

    // This is important to find the correct percentage!
    var diffHeight = (this._rulerHeight - this._sliderHeight);
    var relativeOffset = (relativePos / diffHeight);

    // Offset is a value 0 to this._screens
    var off = this.offset(
      parseInt(relativeOffset * this._screens) + this._event.initOffset
    );

    if (off !== undefined) {
      this._menu.screen(off);
    };
  },

  /**
   * Move the slider to an absolute position
   *
   * @param {number} absolute position
   */
  movetoAbs : function (absPos) {
    var absOffset = (absPos / this._rulerHeight);

    var off = this.offset(parseInt(absOffset * (this._screens + 1)));
    if (off !== undefined) {
      this._menu.screen(off);
    };
  },

  /**
   * Screen offset of the slider
   *
   * @param {number} Offset position of the slider (optional)
   */
  offset : function (off) {
    if (arguments.length === 0)
      return this._offset;

    // Normalize offset
    if (off > this._screens)
      off = this._screens;
    else if (off < 0)
      off = 0;

    // Identical with old value
    if (off === this._offset)
      return undefined;

    // Set offset and move
    this._offset = off;
    this._slider.style.top = (this._step * off) + '%';
    return off;
  },

  /**
   * Get the associated dom element.
   */
  element : function () {
    return this._element;
  },

  /**
   * Reinitialize the size of the slider.
   * Necessary to call after each adjustment of the list.
   */
  reInit : function () {

    var s = this._element.style;

    // Do not show the slider, in case there is nothing to scroll
    if (this._length <= this._limit) {
      s.display = 'none';
      return;
    }
    else {
      s.display = 'block';
    };

    this._height  = ((this._limit / this._length) * 100);
    this._screens = this._length - this._limit;
    this._step    = (100 - this._height) / this._screens;
    this._slider.style.height = this._height + '%';
  },

  // Initialize prefix object
  _init : function (menu) {

    this._menu = menu;

    this._offset = 0;
    this._event = {};
    this._active = false;

    var el = this._element = document.createElement('div');
    el.setAttribute('class', 'ruler');

    this._slider = el.appendChild(
      document.createElement('span')
    );

    this._ruler = el.appendChild(document.createElement('div'));

    // Do not mark the menu on mousedown
    this._ruler.addEventListener('mousedown', function (e) {
      e.halt()
    }, false);

    // Move the slider to the click position
    this._ruler.addEventListener('click', this._mouseclick.bind(this), false);

    this._slider.addEventListener('mousedown', this._mousedown.bind(this), false);

    return this;
  },

  // Reinit height based on dom position
  _initClientHeight : function () {
    this._rulerHeight  = this._element.clientHeight;
    this._sliderHeight = this._slider.clientHeight;
  },

  // Release mousemove event
  _mousemove : function (e) {
    this.movetoRel(e.clientY - this._event.init);
    e.halt();
  },

  // Release mouseup event
  _mouseup : function (e) {
    this.active(false);
    window.removeEventListener('mousemove', this._event.mov);
    window.removeEventListener('mouseup', this._event.up);
    this._menu.focus();
  },

  // Release mousedown event
  _mousedown : function (e) {
    // Bind drag handler
    var ev = this._event;

    // _step * _offset is the distance of the ruler to the top
    ev.init = e.clientY;
    ev.initOffset = this._offset;
    // By substracting that, it is like initializing to the first point

    ev.mov  = this._mousemove.bind(this);
    ev.up   = this._mouseup.bind(this);

    // TODO: This may not be necessary all the time
    this._initClientHeight();

    this.active(true);

    window.addEventListener('mousemove', ev.mov);
    window.addEventListener('mouseup', ev.up);

    e.halt();
  },

  // Release event to reposition slider on ruler
  _mouseclick : function (e) {
    this._initClientHeight();

    this.movetoAbs(
      e.clientY - this._ruler.getClientRects()[0].top
    );
    e.halt();
  }
});
