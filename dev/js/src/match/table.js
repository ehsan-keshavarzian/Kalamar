define(function () {
  var _TermRE = new RegExp("^(?:([^\/]+?)\/)?([^:]+?):(.+?)$");
  
  return {
    create : function (snippet) {
      return Object.create(this)._init(snippet);
    },
    _init : function (snippet) {
      // Create html for traversal
      var html = document.createElement("div");
      html.innerHTML = snippet;
      
      this._pos = 0;
      this._token = [];
      this._info = [];
      this._foundry = {};
      this._layer = {};
    
      // Parse the snippet
      this._parse(html.childNodes);      
    
      html.innerHTML = '';
      return this;
    },
    
    length : function () {
      return this._pos;
    },

    getToken : function (pos) {
      if (pos === undefined)
	return this._token;
      return this._token[pos];
    },
    
    getValue : function (pos, foundry, layer) {
      return this._info[pos][foundry + '/' + layer]
    },
    
    getLayerPerFoundry : function (foundry) {
      return this._foundry[foundry]
    },
    
    getFoundryPerLayer : function (layer) {
      return this._layer[layer];
    },

    // Parse the snippet
    _parse : function (children) {

      // Get all children
      for (var i in children) {
	var c = children[i];

	// Create object on position unless it exists
	if (this._info[this._pos] === undefined)
	  this._info[this._pos] = {};

	// Store at position in foundry/layer as array
	var found = this._info[this._pos];

	// Element with title
	if (c.nodeType === 1) {
	  if (c.getAttribute("title") &&
	      _TermRE.exec(c.getAttribute("title"))) {

	    // Fill position with info
	    var foundry, layer, value;
	    if (RegExp.$2) {
	      foundry = RegExp.$1;
	      layer   = RegExp.$2;
	    }
	    else {
	      foundry = "base";
	      layer   = RegExp.$1
	    };

	    value = RegExp.$3;
	    
	    if (found[foundry + "/" + layer] === undefined)
	      found[foundry + "/" + layer] = [];

	    // Push value to foundry/layer at correct position
	    found[foundry + "/" + layer].push(RegExp.$3);

	    // Set foundry
	    if (this._foundry[foundry] === undefined)
	      this._foundry[foundry] = {};
	    this._foundry[foundry][layer] = 1;

	    // Set layer
	    if (this._layer[layer] === undefined)
	      this._layer[layer] = {};
	    this._layer[layer][foundry] = 1;
	  };

	  // depth search
	  if (c.hasChildNodes())
	    this._parse(c.childNodes);
	}

	// Leaf node
	// store string on position and go to next string
	else if (c.nodeType === 3) {
	  if (c.nodeValue.match(/[a-z0-9]/i))
	    this._token[this._pos++] = c.nodeValue;
	};
      };

      delete this._info[this._pos];
    },


    /**
     * Get HTML table view of annotations.
     */
    element : function () {
      if (this._element !== undefined)
	return this._element;

      // First the legend table
      var d = document;
      var table = d.createElement('table');

      // Single row in head
      var tr = table.appendChild(d.createElement('thead'))
	.appendChild(d.createElement('tr'));

      // Add cell to row
      var addCell = function (type, name) {
	var c = this.appendChild(d.createElement(type))
	if (name === undefined)
	  return c;

	if (name instanceof Array) {
	  for (var n = 0; n < name.length; n++) {
	    c.appendChild(d.createTextNode(name[n]));
	    if (n !== name.length - 1) {
	      c.appendChild(d.createElement('br'));
	    };
	  };
	}
	else {
	  c.appendChild(d.createTextNode(name));
	};
      };

      tr.addCell = addCell;

      // Add header information
      tr.addCell('th', 'Foundry');
      tr.addCell('th', 'Layer');

      // Add tokens
      for (var i in this._token) {
	tr.addCell('th', this.getToken(i));
      };

      var tbody = table.appendChild(
	d.createElement('tbody')
      );

      var foundryList = Object.keys(this._foundry).sort();

      for (var f = 0; f < foundryList.length; f++) {
	var foundry = foundryList[f];
	var layerList =
	  Object.keys(this._foundry[foundry]).sort();

	for (var l = 0; l < layerList.length; l++) {
	  var layer = layerList[l];
	  tr = tbody.appendChild(
	    d.createElement('tr')
	  );
	  tr.setAttribute('tabindex', 0);
	  tr.addCell = addCell;

	  tr.addCell('th', foundry);
	  tr.addCell('th', layer);

	  for (var v = 0; v < this.length(); v++) {
	    tr.addCell(
	      'td',
	      this.getValue(v, foundry, layer) 
	    );
	  };
	};
      };

      return this._element = table;
    }
  };
});
