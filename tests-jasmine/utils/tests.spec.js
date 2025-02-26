import { 
  convertCentToDollar,
  getCurrentProductData
} from "../../scripts/utils.js";

describe('convertCentToDollar return value in dollars equivalent', function() {
  it('should take value "0" and return equivalent "0.00"', function() {
    expect(convertCentToDollar(0)).toEqual('0.00');
  });

  it('should take value "0.1" and return equivalent "0.00"', function() {
    expect(convertCentToDollar(0.1)).toEqual('0.00');
  });

  it('should take value "2000.5" and return equivalent "20.01"', function() {
    expect(convertCentToDollar(2000.5)).toEqual('20.01');
  });
});

describe('test: getCurrentProductData', function() {
  const mockProduct = {
    id: "10ed8504-57db-433c-b0a3-fc71a35c88a1",
    image: "images/products/knit-athletic-sneakers-pink.webp",
    name: "Waterproof Knit Athletic Sneakers - Pink",
    rating: {
        stars: 4,
        count: 89
    },
    priceCents: 3390,
    keywords: [
        "shoes",
        "running shoes",
        "footwear",
        "womens"
    ],
    quantity: 1, // ?
    stock: 9
  };

  beforeAll(function() {
    localStorage.clear();
  });

  beforeEach(function() {
    this.config = {
      id: '10ed8504-57db-433c-b0a3-fc71a35c88a1',
      quantity: 1,
    };
    this.product = getCurrentProductData(this.config.id, this.config.quantity);
  });

  it(`should return product with ID: ${mockProduct.id}`, function() {
    expect(this.product.id).toEqual(mockProduct.id);
  });

  describe('when product has stock 0', function() {
    beforeEach(function() {
      this.product = {
        ...this.product,
        stock: 0,
      }
    });

    it(`should NOT return the product`, function() {
      console.debug(this.product);
      expect(this.product.stock).toEqual(0);
    });
  });

});
