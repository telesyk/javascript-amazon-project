import {
  ATTRIBUTE_DATA_CONTROL,
  EVENT_ADD_TO_CART,
  EVENT_REMOVE_FROM_CART,
  EVENT_CHANGE_DELIVERY_OPTION
} from "../../scripts/constants.js";

describe('test: actions', function() {
  const element = document.createElement('button');

  describe('attribute to run action', function() {  
    beforeEach(function() {
      element.setAttribute(ATTRIBUTE_DATA_CONTROL, 'true');
    });
    
    it(`should have ${ATTRIBUTE_DATA_CONTROL} attribute`, function() {
      expect(element.hasAttribute(ATTRIBUTE_DATA_CONTROL)).toBe(true);
    });

    describe('for adding new product items', function() {
      it(`should equal to attributes "${EVENT_ADD_TO_CART}" value`, function() {
        element.setAttribute(ATTRIBUTE_DATA_CONTROL, EVENT_ADD_TO_CART);
        expect(element.getAttribute(ATTRIBUTE_DATA_CONTROL)).toEqual(EVENT_ADD_TO_CART);
      });
      it(`should equal to attributes "${EVENT_REMOVE_FROM_CART}" value`, function() {
        element.setAttribute(ATTRIBUTE_DATA_CONTROL, EVENT_REMOVE_FROM_CART);
        expect(element.getAttribute(ATTRIBUTE_DATA_CONTROL)).toEqual(EVENT_REMOVE_FROM_CART);
      });
      it(`should equal to attributes "${EVENT_CHANGE_DELIVERY_OPTION}" value`, function() {
        element.setAttribute(ATTRIBUTE_DATA_CONTROL, EVENT_CHANGE_DELIVERY_OPTION);
        expect(element.getAttribute(ATTRIBUTE_DATA_CONTROL)).toEqual(EVENT_CHANGE_DELIVERY_OPTION);
      });
    });
  });
});
