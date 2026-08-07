// Product catalog — names, descriptions, and images sourced directly from
// ibaco.in (Our Products: Ice Creams, Ice Cream Cakes, Signature Cones,
// Signature Bars, Ice Cream Shakes). Prices are approximate retail prices
// since Ibaco doesn't publish one fixed nationwide price card — adjust to
// match your local outlet's menu.

const sampleItems = [
  // ---------------- TUBS (500ml take-home) ----------------
  {
    _id: 't1',
    name: 'Belgian Chocolate',
    category: 'tub',
    price: 500,
    size: '500ml',
    image: 'https://www.ibaco.in/assets/img/sundaes/Image-19.png',
    description: 'Belgian cocoa powder based ice cream.',
    isVeg: true,
    inStock: true,
    rating: 4.8
  },
  {
    _id: 't2',
    name: 'Alphonso Mango',
    category: 'tub',
    price: 480,
    size: '500ml',
    image: 'https://www.ibaco.in/assets/img/sundaes/Image-16.png',
    description: 'Mango flavoured ice cream with chunks of mango.',
    isVeg: true,
    inStock: true,
    rating: 4.6
  },
  {
    _id: 't3',
    name: 'Chocolate Overload',
    category: 'tub',
    price: 450,
    size: '500ml',
    image: 'https://www.ibaco.in/assets/img/sundaes/Image-23.png',
    description: 'A deep and rich chocolate flavour that truly defines indulgence.',
    isVeg: true,
    inStock: true,
    rating: 4.6
  },
  {
    _id: 't4',
    name: 'Italian Wonder',
    category: 'tub',
    price: 480,
    size: '500ml',
    image: 'https://www.ibaco.in/assets/img/sundaes/Italian-Wonder.png',
    description: 'Natural vanilla flavoured ice cream with cashew, raisins and a combination of 3 sauces: mixed fruit, pineapple & raspberry.',
    isVeg: true,
    inStock: true,
    rating: 4.5
  },
  {
    _id: 't5',
    name: 'Swiss Chocolate',
    category: 'tub',
    price: 480,
    size: '500ml',
    image: 'https://www.ibaco.in/assets/img/sundaes/Image-15.png',
    description: 'Experience the finest flavours of indulgence from the happiest country in the world.',
    isVeg: true,
    inStock: true,
    rating: 4.5
  },
  {
    _id: 't6',
    name: 'Butterscotch',
    category: 'tub',
    price: 450,
    size: '500ml',
    image: 'https://www.ibaco.in/assets/img/sundaes/Image-8.png',
    description: 'Butterscotch flavoured ice cream with cashew praline + walnut praline.',
    isVeg: true,
    inStock: true,
    rating: 4.5
  },
  {
    _id: 't7',
    name: 'Dark Chocolate',
    category: 'tub',
    price: 450,
    size: '500ml',
    image: 'https://www.ibaco.in/assets/img/sundaes/Image-3.png',
    description: 'Chocolate flavoured ice cream with chocolate buttons.',
    isVeg: true,
    inStock: true,
    rating: 4.4
  },
  {
    _id: 't8',
    name: 'Nuts & Saffron',
    category: 'tub',
    price: 500,
    size: '500ml',
    image: 'https://www.ibaco.in/assets/img/sundaes/Image-20.png',
    description: 'Saffron flavoured ice cream with basundi, milkmaid, saffron, cardamom, pistachio, almond & cashew nuts.',
    isVeg: true,
    inStock: true,
    rating: 4.7
  },
  {
    _id: 't9',
    name: 'Fruit Bonanza',
    category: 'tub',
    price: 460,
    size: '500ml',
    image: 'https://www.ibaco.in/assets/img/sundaes/Image-33.png',
    description: 'Vanilla flavoured ice cream with fig, blackcurrant, pineapple, raisin, cashew, karonda & tutty fruity.',
    isVeg: true,
    inStock: true,
    rating: 4.4
  },
  {
    _id: 't10',
    name: 'Almond Crunch',
    category: 'tub',
    price: 450,
    size: '500ml',
    image: 'https://www.ibaco.in/assets/img/sundaes/Image-5.png',
    description: 'Natural vanilla flavoured ice cream with almond nuts coated with chocolate & honey sauce.',
    isVeg: true,
    inStock: true,
    rating: 4.5
  },

  // ---------------- SINGLE SCOOPS (95g cup) ----------------
  {
    _id: 's1',
    name: 'Bubblegum',
    category: 'scoop',
    price: 119,
    size: '95g',
    image: 'https://www.ibaco.in/assets/img/sundaes/IBACO---Bubblegum.png',
    description: 'The nostalgic flavours of bubble gum combined with hints of strawberry jelly.',
    isVeg: true,
    inStock: true,
    rating: 4.5
  },
  {
    _id: 's2',
    name: 'Cotton Candy',
    category: 'scoop',
    price: 119,
    size: '95g',
    image: 'https://www.ibaco.in/assets/img/sundaes/IBACO---Cotton-Candy.png',
    description: 'The delightful taste of cotton candy in an ice cream.',
    isVeg: true,
    inStock: true,
    rating: 4.6
  },
  {
    _id: 's3',
    name: 'Coffee Caramel',
    category: 'scoop',
    price: 119,
    size: '95g',
    image: 'https://www.ibaco.in/assets/img/sundaes/IBACO-WEBSITE-Coffee-caramel.png',
    description: 'A rich blend of coffee-infused caramel indulgence.',
    isVeg: true,
    inStock: true,
    rating: 4.5
  },
  {
    _id: 's4',
    name: 'Tiramisu',
    category: 'scoop',
    price: 131,
    size: '95g',
    image: 'https://www.ibaco.in/assets/img/sundaes/tiramisu-2.png',
    description: 'Experience a jolt of flavour as Tiramisu and coffee come together to wake you up to a world of indulgence.',
    isVeg: true,
    inStock: true,
    rating: 4.8
  },
  {
    _id: 's5',
    name: 'Tender Coconut',
    category: 'scoop',
    price: 119,
    size: '95g',
    image: 'https://www.ibaco.in/assets/img/sundaes/IBACO-NEW-SCOOPES-WEB-COCONUT.png',
    description: 'Creamy ice cream with a rich coconut flavour. A treat for all coconut lovers.',
    isVeg: true,
    inStock: true,
    rating: 4.4
  },
  {
    _id: 's6',
    name: 'Bean Vanilla',
    category: 'scoop',
    price: 119,
    size: '95g',
    image: 'https://www.ibaco.in/assets/img/sundaes/Image-1.png',
    description: 'Natural vanilla flavoured ice cream with vanilla bean powder.',
    isVeg: true,
    inStock: true,
    rating: 4.3
  },
  {
    _id: 's7',
    name: 'Strawberry',
    category: 'scoop',
    price: 119,
    size: '95g',
    image: 'https://www.ibaco.in/assets/img/sundaes/Strawberry.png',
    description: 'Strawberry flavoured ice cream with strawberry fruit crush.',
    isVeg: true,
    inStock: true,
    rating: 4.4
  },
  {
    _id: 's8',
    name: 'Pistachio',
    category: 'scoop',
    price: 131,
    size: '95g',
    image: 'https://www.ibaco.in/assets/img/sundaes/Image-4.png',
    description: 'Pistachio flavoured ice cream with pistachio nuts.',
    isVeg: true,
    inStock: true,
    rating: 4.6
  },
  {
    _id: 's9',
    name: 'Blueberry Cheesecake',
    category: 'scoop',
    price: 131,
    size: '95g',
    image: 'https://www.ibaco.in/assets/img/sundaes/Image-6.png',
    description: 'Surrender to the charms of blueberry and cheese.',
    isVeg: true,
    inStock: true,
    rating: 4.7
  },
  {
    _id: 's10',
    name: 'Sea Salt Caramel Pecan',
    category: 'scoop',
    price: 131,
    size: '95g',
    image: 'https://www.ibaco.in/assets/img/sundaes/Image-10.png',
    description: 'Caramel and pecan serve up a treat that is part salty, part nutty.',
    isVeg: true,
    inStock: true,
    rating: 4.6
  },
  {
    _id: 's11',
    name: 'Cream N Cookies',
    category: 'scoop',
    price: 119,
    size: '95g',
    image: 'https://www.ibaco.in/assets/img/sundaes/Image-12.png',
    description: 'Natural vanilla flavoured ice cream with toffee & malt granular.',
    isVeg: true,
    inStock: true,
    rating: 4.5
  },
  {
    _id: 's12',
    name: 'Vanilla Choco Chips',
    category: 'scoop',
    price: 119,
    size: '95g',
    image: 'https://www.ibaco.in/assets/img/sundaes/Image-13.png',
    description: 'Natural vanilla flavoured ice cream with chocolate buttons & chocolate fudge.',
    isVeg: true,
    inStock: true,
    rating: 4.4
  },
  {
    _id: 's13',
    name: 'Vanilla Choco Berry',
    category: 'scoop',
    price: 119,
    size: '95g',
    image: 'https://www.ibaco.in/assets/img/sundaes/Image-21.png',
    description: 'Vanilla, chocolate and berry — sit back and enjoy as 3 classic flavours vie for your attention.',
    isVeg: true,
    inStock: true,
    rating: 4.4
  },
  {
    _id: 's14',
    name: 'Blackcurrant',
    category: 'scoop',
    price: 119,
    size: '95g',
    image: 'https://www.ibaco.in/assets/img/sundaes/Image-26.png',
    description: 'Blackcurrant flavoured ice cream with dry blackcurrant fruit.',
    isVeg: true,
    inStock: true,
    rating: 4.3
  },
  {
    _id: 's15',
    name: 'Mocha Fudge',
    category: 'scoop',
    price: 131,
    size: '95g',
    image: 'https://www.ibaco.in/assets/img/sundaes/Image-27.png',
    description: 'Nothing like indulging in a scoop of divine mocha magic.',
    isVeg: true,
    inStock: true,
    rating: 4.6
  },
  {
    _id: 's16',
    name: 'Jackfruit',
    category: 'scoop',
    price: 119,
    size: '95g',
    image: 'https://www.ibaco.in/assets/img/sundaes/Image-30.png',
    description: 'Jackfruit flavoured ice cream with jackfruit pulp.',
    isVeg: true,
    inStock: true,
    rating: 4.2
  },
  {
    _id: 's17',
    name: 'Fig & Honey',
    category: 'scoop',
    price: 119,
    size: '95g',
    image: 'https://www.ibaco.in/assets/img/sundaes/Image-32.png',
    description: 'Honey flavoured ice cream with fig fruit crush.',
    isVeg: true,
    inStock: true,
    rating: 4.3
  },
  {
    _id: 's18',
    name: 'Avocado Honey',
    category: 'scoop',
    price: 131,
    size: '95g',
    image: 'https://www.ibaco.in/assets/img/sundaes/Avacodo-Honey.png',
    description: 'Avocado and honey come together to create a flavour your palate will never see coming.',
    isVeg: true,
    inStock: true,
    rating: 4.3
  },
  {
    _id: 's19',
    name: 'Peach & Strawberry',
    category: 'scoop',
    price: 119,
    size: '95g',
    image: 'https://www.ibaco.in/assets/img/sundaes/Ibaco-Icecream-Peach-Strawberry-Duet-New.png',
    description: 'Peach & strawberry flavoured ice cream with peach chunks & strawberry sauce.',
    isVeg: true,
    inStock: true,
    rating: 4.4
  },

  // ---------------- SUNDAES ----------------
  {
    _id: 'su1',
    name: 'Belgian Chocolate Sundae',
    category: 'sundae',
    price: 149,
    size: 'Sundae',
    image: 'https://www.ibaco.in/assets/img/sundaes/Image-19.png',
    description: 'Belgian chocolate ice cream layered with chocolate sauce and your choice of toppings.',
    isVeg: true,
    inStock: true,
    rating: 4.8
  },
  {
    _id: 'su2',
    name: 'Cotton Candy Sundae',
    category: 'sundae',
    price: 135,
    size: 'Sundae',
    image: 'https://www.ibaco.in/assets/img/sundaes/IBACO---Cotton-Candy.png',
    description: 'Cotton candy ice cream topped with rainbow sprinkles and candied fruit.',
    isVeg: true,
    inStock: true,
    rating: 4.5
  },
  {
    _id: 'su3',
    name: 'Bubblegum Sundae',
    category: 'sundae',
    price: 135,
    size: 'Sundae',
    image: 'https://www.ibaco.in/assets/img/sundaes/IBACO---Bubblegum.png',
    description: 'Bubblegum ice cream topped with rainbow buttons and chocolate sprinkles.',
    isVeg: true,
    inStock: true,
    rating: 4.4
  },

  // ---------------- SIGNATURE CONES ----------------
  {
    _id: 'c1',
    name: 'Signature Cone',
    category: 'cone',
    price: 99,
    size: 'Regular',
    image: 'https://www.ibaco.in/assets/img/cones/Ibaco-Signature-Cones-2024.jpg',
    description: 'Choose your favourite Ibaco ice cream flavour served in a crunchy signature cone.',
    isVeg: true,
    inStock: true,
    rating: 4.4
  },

  // ---------------- SIGNATURE BARS ----------------
  {
    _id: 'b1',
    name: 'Signature Bar',
    category: 'bar',
    price: 89,
    size: 'Regular',
    image: 'https://www.ibaco.in/assets/img/bars/Ibaco-%20Signature-Bars-New-Desktop.jpg',
    description: 'Customisable ice cream bar with your choice of toppings and sauces.',
    isVeg: true,
    inStock: true,
    rating: 4.3
  },

  // ---------------- SHAKES ----------------
  {
    _id: 'sh1',
    name: 'Ibaco Ice Cream Shake',
    category: 'shake',
    price: 179,
    size: '400ml',
    image: 'https://www.ibaco.in/assets/img/Ice-cream-shakes-mob1.jpg',
    description: 'A deliciously smooth shake made with your choice of Ibaco ice cream flavour, blended in two simple steps.',
    isVeg: true,
    inStock: true,
    rating: 4.5
  },

  // ---------------- ICE CREAM CAKES ----------------
  {
    _id: 'ck1',
    name: 'Choco Cookie Teddy Bear',
    category: 'cake',
    price: 1250,
    size: '10 Serve',
    image: 'https://www.ibaco.in/assets/img/cakes/Bear-Cake.png',
    description: "Belgian chocolate and cream 'n' cookies ice cream topped with choco fudge.",
    isVeg: true,
    inStock: true,
    rating: 4.7
  },
  {
    _id: 'ck2',
    name: 'Happy Berry Pond',
    category: 'cake',
    price: 799,
    size: '6 Serve',
    image: 'https://www.ibaco.in/assets/img/cakes/Kids-Cake.png',
    description: 'Strawberry ice cream paired with vanilla choco berry ice cream.',
    isVeg: true,
    inStock: true,
    rating: 4.6
  },
  {
    _id: 'ck3',
    name: 'Chocolate Overload Cake',
    category: 'cake',
    price: 799,
    size: '6 Serve',
    image: 'https://www.ibaco.in/assets/img/cakes/cake1.png',
    description: 'A heavenly chocolate cake base interspersed with chocolate ice cream and topped with flakes and almonds.',
    isVeg: true,
    inStock: true,
    rating: 4.8
  },
  {
    _id: 'ck4',
    name: 'Fruit and Blackcurrant Drizzle',
    category: 'cake',
    price: 799,
    size: '6 Serve',
    image: 'https://www.ibaco.in/assets/img/cakes/Fruit-and-Blackcurrant.png',
    description: 'Blackcurrant + vanilla flavoured Fruit Bonanza ice cream with assorted nuts.',
    isVeg: true,
    inStock: true,
    rating: 4.4
  },
  {
    _id: 'ck5',
    name: 'Mango Italian Fiesta',
    category: 'cake',
    price: 799,
    size: '6 Serve',
    image: 'https://www.ibaco.in/assets/img/cakes/Mango-Italian-Fiesta-cake.png',
    description: 'Mango Kingdom + vanilla flavoured Italian Wonder ice cream with assorted nuts.',
    isVeg: true,
    inStock: true,
    rating: 4.5
  },
  {
    _id: 'ck6',
    name: 'Swiss Choco Symphony',
    category: 'cake',
    price: 799,
    size: '6 Serve',
    image: 'https://www.ibaco.in/assets/img/cakes/swiss-choco-cake.png',
    description: 'Swiss chocolate + white chocolate ice cream coated with chocolate chips.',
    isVeg: true,
    inStock: true,
    rating: 4.6
  },
  {
    _id: 'ck7',
    name: 'Pistachio Almond Ecstasy',
    category: 'cake',
    price: 799,
    size: '6 Serve',
    image: 'https://www.ibaco.in/assets/img/cakes/cake_pistachio.png',
    description: 'Dulce de leche infused cream partners up with Californian pistachio & almond crunch ice cream.',
    isVeg: true,
    inStock: true,
    rating: 4.8
  },
  {
    _id: 'ck8',
    name: 'Black Forest',
    category: 'cake',
    price: 1250,
    size: '10 Serve',
    image: 'https://www.ibaco.in/assets/img/cakes/cake8.png',
    description: 'Lush layers of Black Forest & white choco raspberry ice cream topped with cherries and chocolate flakes, on a Black Forest cake base.',
    isVeg: true,
    inStock: true,
    rating: 4.9
  },
  {
    _id: 'ck9',
    name: 'BlackCurrant Rich Cream',
    category: 'cake',
    price: 1250,
    size: '10 Serve',
    image: 'https://www.ibaco.in/assets/img/cakes/Blackcurrant.png',
    description: 'Electric blackcurrant and blackberry ice cream with cranberries and dried blackcurrant chunks.',
    isVeg: true,
    inStock: true,
    rating: 4.5
  },
  {
    _id: 'ck10',
    name: 'Butterscotch Almond Amore',
    category: 'cake',
    price: 1250,
    size: '10 Serve',
    image: 'https://www.ibaco.in/assets/img/cakes/cake7.png',
    description: 'Butter + vanilla based almond crunch ice cream with almonds and white choco shavings.',
    isVeg: true,
    inStock: true,
    rating: 4.6
  },
  {
    _id: 'ck11',
    name: 'Mango Kingdom Gala',
    category: 'cake',
    price: 2100,
    size: '20 Serve',
    image: 'https://www.ibaco.in/assets/img/cakes/cake9.png',
    description: 'A dessert for royalty made with Mango Kingdom ice cream and white chocolate shavings.',
    isVeg: true,
    inStock: true,
    rating: 4.7
  },
  {
    _id: 'ck12',
    name: 'Dessert Royale',
    category: 'cake',
    price: 499,
    size: 'Mini Edition',
    image: 'https://www.ibaco.in/assets/img/cakes/Dessert-Royale-Desk.png',
    description: 'Rich Maharaja Bhog ice cream, topped with raj bhog nuts and surrounded with white chocolate flakes.',
    isVeg: true,
    inStock: false,
    rating: 4.8
  },

  // ---------------- COMBO ----------------
  {
    _id: 'co1',
    name: 'Party Combo Pack',
    category: 'combo',
    price: 1350,
    size: '3 Tubs (500ml each)',
    image: 'https://www.ibaco.in/assets/img/sundaes/Image-33.png',
    description: 'Choose any 3 tubs of your favourite flavours — great for parties.',
    isVeg: true,
    inStock: true,
    rating: 4.6
  }
];

export default sampleItems;
