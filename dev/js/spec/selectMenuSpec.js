define(
  ['selectMenu'],
  function (selectMenuClass) {

    /*
     * Check for preselected values
     */
    
    describe('KorAP.SelectMenu', function () {
      var list = [
	      {
	        content : 'Poliqarp',
	        value : 'poliqarp',
	        desc : 'The Polish National Corpus QL'
	      },
	      {
	        content : 'Cosmas II',
	        value : 'cosmas2',
	        desc : 'The Polish National Corpus QL'
	      },
	      {
	        content : 'Annis',
	        value : 'annis'
	      },
	      {
	        content : 'CQL v1.2',
	        value : 'cql'
	      }
      ];
      
      it('should replace a select element', function () {
	      var div = document.createElement('div');
	      var element = div.appendChild(document.createElement('select'));
	      for (i in list) {
	        var opt = element.appendChild(document.createElement('option'));
	        opt.setAttribute('value', list[i].value);
	        opt.appendChild(document.createTextNode(list[i].content));
	      };

	      var menu = selectMenuClass.create(div);

	      expect(element.style.display).toEqual('none');

        // This selects the first item
        expect(menu.select()).toEqual(0);
        expect(menu._title.textContent).toEqual('Poliqarp');
        
        // Now show the menu
	      menu.showSelected();

        expect(menu.item(0).active()).toBe(true);
	      expect(menu.item(0).noMore()).toBe(true);

        // TODO: Improve lcfield!!!!!!
	      expect(menu.shownItem(0).lcField()).toEqual(' poliqarp');
      });

      it('should first show the selected value', function () {
	      var div = document.createElement('div');
	      var element = div.appendChild(document.createElement('select'));
	      for (i in list) {
	        var opt = element.appendChild(document.createElement('option'));
	        opt.setAttribute('value', list[i].value);
	        opt.appendChild(document.createTextNode(list[i].content));
	      };

        expect(element.selectedIndex).toEqual(0);

        // Select annis
        element.children[2].selected = true;

        expect(element.selectedIndex).toEqual(2);
        
	      var menu = selectMenuClass.create(div);
        menu.show(3);
        expect(menu._title.textContent).toEqual('Annis');
      });
    });
  }
);
