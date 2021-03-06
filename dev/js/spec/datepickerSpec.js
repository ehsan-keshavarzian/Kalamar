define(['datepicker'], function (dpClass) {
  describe('KorAP.Datepicker', function () {

    it('should be initializable', function () {
      var dp = dpClass.create();
      var e = dp.show();
      expect(e.nodeName).toEqual('DIV');
      expect(e.classList.contains('datepicker')).toBeTruthy();
      expect(e.getAttribute('tabindex')).toEqual('0');
    });

    it('should generate valid dates', function () {
      var dp = dpClass.create();
      expect(dp.today()).toMatch("\\d{4}-[01\\d-[01]\\d");
    });    

    it('should have year and month helpers', function () {
      var dp = dpClass.create();
      var e = dp.show(2013, 2);
      expect(e.nodeName).toEqual('DIV');
      expect(e.classList.contains('datepicker')).toBeTruthy();
      expect(e.getAttribute('tabindex')).toEqual('0');
      expect(e.querySelector('div.year > span:nth-child(2)').firstChild.data).toEqual('2013');
      expect(e.querySelector('div.month > span:nth-child(2)').firstChild.data).toEqual('February');
    });

    it('should have modifyable year', function () {
      var dp = dpClass.create();
      var e = dp.show(2013, 2);
      expect(e.nodeName).toEqual('DIV');
      expect(e.classList.contains('datepicker')).toBeTruthy();
      expect(e.getAttribute('tabindex')).toEqual('0');
      expect(e.querySelector('div.year > span:nth-child(2)').firstChild.data).toEqual('2013');
      expect(e.querySelector('div.month > span:nth-child(2)').firstChild.data).toEqual('February');

      dp.incrYear();
      expect(e.querySelector('div.year > span:nth-child(2)').firstChild.data).toEqual('2014');
      expect(e.querySelector('div.month > span:nth-child(2)').firstChild.data).toEqual('February');

      dp.incrYear();
      expect(e.querySelector('div.year > span:nth-child(2)').firstChild.data).toEqual('2015');
      expect(e.querySelector('div.month > span:nth-child(2)').firstChild.data).toEqual('February');

      dp.decrYear();
      expect(e.querySelector('div.year > span:nth-child(2)').firstChild.data).toEqual('2014');
      expect(e.querySelector('div.month > span:nth-child(2)').firstChild.data).toEqual('February');

      // Max value
      e = dp.show(9998, 2);
      expect(e.querySelector('div.year > span:nth-child(2)').firstChild.data).toEqual('9998');
      expect(e.querySelector('div.month > span:nth-child(2)').firstChild.data).toEqual('February');

      dp.incrYear();
      expect(e.querySelector('div.year > span:nth-child(2)').firstChild.data).toEqual('9999');
      expect(e.querySelector('div.month > span:nth-child(2)').firstChild.data).toEqual('February');

      dp.incrYear();
      expect(e.querySelector('div.year > span:nth-child(2)').firstChild.data).toEqual('9999');
      expect(e.querySelector('div.month > span:nth-child(2)').firstChild.data).toEqual('February');

      // Min value
      e = dp.show(2, 2);
      expect(e.querySelector('div.year > span:nth-child(2)').firstChild.data).toEqual('2');
      expect(e.querySelector('div.month > span:nth-child(2)').firstChild.data).toEqual('February');

      dp.decrYear();
      expect(e.querySelector('div.year > span:nth-child(2)').firstChild.data).toEqual('1');
      expect(e.querySelector('div.month > span:nth-child(2)').firstChild.data).toEqual('February');

      dp.decrYear();
      expect(e.querySelector('div.year > span:nth-child(2)').firstChild.data).toEqual('0');
      expect(e.querySelector('div.month > span:nth-child(2)').firstChild.data).toEqual('February');

      dp.decrYear();
      expect(e.querySelector('div.year > span:nth-child(2)').firstChild.data).toEqual('0');
      expect(e.querySelector('div.month > span:nth-child(2)').firstChild.data).toEqual('February');
    });

    it('should have modifyable month', function () {
      var dp = dpClass.create();
      var e = dp.show(2012, 9);

      expect(e.nodeName).toEqual('DIV');
      expect(e.classList.contains('datepicker')).toBeTruthy();

      expect(e.getAttribute('tabindex')).toEqual('0');
      expect(e.querySelector('div.year > span:nth-child(2)').firstChild.data).toEqual('2012');
      expect(e.querySelector('div.month > span:nth-child(2)').firstChild.data).toEqual('September');

      dp.incrMonth();
      expect(e.querySelector('div.year > span:nth-child(2)').firstChild.data).toEqual('2012');
      expect(e.querySelector('div.month > span:nth-child(2)').firstChild.data).toEqual('October');

      dp.incrMonth();
      expect(e.querySelector('div.year > span:nth-child(2)').firstChild.data).toEqual('2012');
      expect(e.querySelector('div.month > span:nth-child(2)').firstChild.data).toEqual('November');

      dp.incrMonth();
      expect(e.querySelector('div.year > span:nth-child(2)').firstChild.data).toEqual('2012');
      expect(e.querySelector('div.month > span:nth-child(2)').firstChild.data).toEqual('December');

      dp.incrMonth();
      expect(e.querySelector('div.year > span:nth-child(2)').firstChild.data).toEqual('2013');
      expect(e.querySelector('div.month > span:nth-child(2)').firstChild.data).toEqual('January');

      dp.decrMonth();
      expect(e.querySelector('div.year > span:nth-child(2)').firstChild.data).toEqual('2012');
      expect(e.querySelector('div.month > span:nth-child(2)').firstChild.data).toEqual('December');

      // Max value
      e = dp.show(9999, 12);
      expect(e.querySelector('div.year > span:nth-child(2)').firstChild.data).toEqual('9999');
      expect(e.querySelector('div.month > span:nth-child(2)').firstChild.data).toEqual('December');

      dp.incrMonth();
      expect(e.querySelector('div.year > span:nth-child(2)').firstChild.data).toEqual('9999');
      expect(e.querySelector('div.month > span:nth-child(2)').firstChild.data).toEqual('December');

      // Min value
      e = dp.show(1, 2);
      expect(e.querySelector('div.year > span:nth-child(2)').firstChild.data).toEqual('1');
      expect(e.querySelector('div.month > span:nth-child(2)').firstChild.data).toEqual('February');

      dp.decrMonth();
      expect(e.querySelector('div.year > span:nth-child(2)').firstChild.data).toEqual('1');
      expect(e.querySelector('div.month > span:nth-child(2)').firstChild.data).toEqual('January');

      dp.decrMonth();
      expect(e.querySelector('div.year > span:nth-child(2)').firstChild.data).toEqual('0');
      expect(e.querySelector('div.month > span:nth-child(2)').firstChild.data).toEqual('December');

      e = dp.show(0, 2);
      expect(e.querySelector('div.year > span:nth-child(2)').firstChild.data).toEqual('0');
      expect(e.querySelector('div.month > span:nth-child(2)').firstChild.data).toEqual('February');

      dp.decrMonth();
      expect(e.querySelector('div.year > span:nth-child(2)').firstChild.data).toEqual('0');
      expect(e.querySelector('div.month > span:nth-child(2)').firstChild.data).toEqual('January');

      dp.decrMonth();
      expect(e.querySelector('div.year > span:nth-child(2)').firstChild.data).toEqual('0');
      expect(e.querySelector('div.month > span:nth-child(2)').firstChild.data).toEqual('January');

    });
  });
});
