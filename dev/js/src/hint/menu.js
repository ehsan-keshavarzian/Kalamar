/**
 * Hint menu
 */
define(['menu', 'hint/item', 'hint/prefix'], function (menuClass, itemClass, prefixClass) {
  return {

    /**
     * Create new hint helper menu.
     */
    create : function (hint, context, params) {
      var obj = Object.create(menuClass)
	.upgradeTo(this)
	._init(itemClass, prefixClass, params);
      obj._context = context;
      obj._element.classList.add('hint');
      obj._hint = hint;

      // Make the top item always active
      obj._firstActive = true;

      // This is only domspecific
      obj.element().addEventListener('blur', function (e) {
	this.menu.hide();
      });

      // Focus on input field on hide
      obj.onHide = function () {
	var input = this._hint.inputField();
	input.container().classList.remove('active');
	input.element().focus();
      };

      return obj;
    },

    /**
     * The hint helper object,
     * the menu is attached to.
     */ 
    hint : function () {
      return this._hint;
    }
  };
});
