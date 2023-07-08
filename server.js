const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const PORT = 2410;

const app = express();

app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.use(cors());
app.use(morgan('dev'));
app.listen(PORT, () => console.log(`Listening on port http://localhost:${PORT}`));


const productsArr = [
  {
    id: 1,
    category: "Watches",
    description:
      "The look that made Swiss watches the toast of the world. Still unbeatable.",
    imgLink:
      "https://images.pexels.com/photos/125779/pexels-photo-125779.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
    name: "Silver",
    price: 1600
  },
  {
    id: 2,
    category: "Watches",
    description: "Dark, black beauty. Sure to look good on the wrist.",
    imgLink:
      "https://images.pexels.com/photos/1697566/pexels-photo-1697566.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    name: "Black",
    price: 899
  },
  {
    id: 3,
    category: "Watches",
    description:
      "Multi chronographs, stop watch, timers. Altimeter. What else.",
    imgLink:
      "https://images.pexels.com/photos/2113994/pexels-photo-2113994.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    name: "Chronograph",
    price: 1199
  },
  {
    id: 4,
    category: "Watches",
    description: "For all ages. For all times. Classic Look. Classic leather.",
    imgLink:
      "https://images.pexels.com/photos/236915/pexels-photo-236915.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    name: "Classic",
    price: 1250
  },
  {
    id: 5,
    category: "Watches",
    description: "The original Apple Watch. Still a great buy.",
    imgLink:
      "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    name: "Apple v1",
    price: 999
  },
  {
    id: 6,
    category: "Watches",
    description: "Mechanical 28 jewelled watch. Connoisseur delight.",
    imgLink:
      "https://images.pexels.com/photos/47339/mechanics-movement-feinmechanik-wrist-watch-47339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    name: "Jewelled",
    price: 1999
  },
  {
    id: 7,
    category: "Sunglasses",
    description: "Desirable, reddish tint. Sure to attract attention.",
    imgLink:
      "https://images.pexels.com/photos/46710/pexels-photo-46710.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    name: "Tinted Red",
    price: 399
  },
  {
    id: 8,
    category: "Sunglasses",
    description: "Nostalgic, bluish tint, sure to get memories back. Vintage.",
    imgLink:
      "https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    name: "Oldies",
    price: 199
  },
  {
    id: 9,
    category: "Sunglasses",
    description: "Trendy, young sunglasses with retro look. Teen favourite.",
    imgLink:
      "https://images.pexels.com/photos/1362558/pexels-photo-1362558.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    name: "Youthful",
    price: 219
  },
  {
    id: 10,
    category: "Sunglasses",
    description: "Chic sunglasses. Classic dark shades, sure to generate envy.",
    imgLink:
      "https://images.pexels.com/photos/65659/glasses-glass-circle-light-transmittance-65659.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    name: "Classic Dark",
    price: 249
  },
  {
    id: 11,
    category: "Watches",
    description: "Apple Watch Version 2. A delight.",
    imgLink:
      "https://images.pexels.com/photos/277406/pexels-photo-277406.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    name: "Apple v2",
    price: 1499
  },
  {
    id: 12,
    category: "Belts",
    description: "Stylish formal brown belt. An office favourite.",
    imgLink:
      "https://as1.ftcdn.net/jpg/02/14/48/72/500_F_214487233_Aahw3DohDu6dSSfMqWCcU1QDatxpDt6E.jpg",
    name: "Fab Brown",
    price: 149
  },
  {
    id: 13,
    category: "Handbags",
    description: "Desirable travel bag. Mix of convenience and style",
    imgLink:
      "https://images.pexels.com/photos/2534961/pexels-photo-2534961.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    name: "Travel Lite",
    price: 199
  },
  {
    id: 14,
    category: "Handbags",
    description: "3 Pockets, 2 Zips -  ideal for shopping and parties",
    imgLink:
      "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    name: "Chic Leather",
    price: 749
  },
  {
    id: 15,
    category: "Belts",
    description: "Signature belt from Gucci ",
    imgLink:
      "https://img.shopstyle-cdn.com/pim/c7/a6/c7a695a8db5a375b222f15bea045bdea_xlarge.jpg",
    name: "Raw Edge",
    price: 799
  },
  {
    id: 16,
    category: "Belts",
    description: "Iconic metallic belt",
    imgLink:
      "https://img.shopstyle-cdn.com/pim/81/78/8178fa6c3b27d3f3e0fe18d019c992ea_xlarge.jpg",
    name: "Goofy Black",
    price: 349
  },
  {
    id: 17,
    category: "Sunglasses",
    description: "Min black faded front shades",
    imgLink:
      "https://showcase-sunglasses.myshopify.com/cdn/shop/products/ShowcaseSunglassesMensCollection2_380x@2x.jpg?v=1501652114",
    name: "Quay Shades",
    price: 479
  },
  {
    id: 18,
    category: "Belts",
    description: "Evergreen formal belt with classic buckle",
    imgLink:
      "https://as1.ftcdn.net/jpg/02/02/45/86/500_F_202458696_CYlcJbJfjgUb2VgQnPSUxHU79v6I3SC6.jpg",
    name: "Classic Brown",
    price: 128
  },
  {
    id: 19,
    category: "Handbags",
    description: "Beach handbag to go along with a beach holiday",
    imgLink:
      "https://images.pexels.com/photos/2305000/pexels-photo-2305000.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    name: "Funky Jute",
    price: 99
  }
];

const users = [
  { username: "jack@gmail.com", password: "jack1234" },
  { username: "tim@gmail.com", password: "tim1234" },
]

const orders = [
  { name: 'Jack', city: 'Delhi', address: 'Noida Sector. 18', amount: 'Rs. 2450', items: 2 },
  { name: 'Puneet', city: 'Haryana', address: 'Near 200ft. Road Third Floor', amount: 'Rs. 2000', items: 1 },
  { name: 'Steve', city: 'Noida', address: 'Sector. 102 Building No. 4 Second floor', amount: 'Rs. 2450', items: 6 },
  { name: 'Yolo', city: 'Delhi', address: 'Opposit Metro Pillar No. 205', amount: 'Rs. 1550', items: 9 },
  { name: 'Honney', city: 'Gurgaon', address: 'House No. 108, Sector 44', amount: 'Rs. 15600', items: 5 },
  { name: 'Tony', city: 'NYC', address: 'Stark Tower', amount: 'Rs. 956000', items: 1500 },
]

let originalProductsArr = [...productsArr]
let originalUsers = [...users]
let originalOrders = [...orders]


// @ GET
// @ ROUTE : /reset
app.get('/reset', (req, res) => {
  productsArr = [...originalProductsArr]
  users = [...originalUsers]
  orders = [...originalOrders]
  return res.status(200).send('Data Reset Successfully')
})

// @ GET
// @ ROUTE : /products or /product/:category
app.get('/products/:category?', (req, res) => {
  let { category } = req.params;
  if (category) {
    let filteredProductsArr = productsArr.filter(p => p.category === category);
    return res.status(200).json(filteredProductsArr)
  } else {
    return res.status(200).json(productsArr)
  }
})


// @ DELETE
// @ ROUTE : /products/:id
app.delete('/products/:id', (req, res) => {
  let { id } = req.params;
  let index = productsArr.findIndex(p => p.id == (id));
  if (index >= 0) {
    productsArr.splice(index, 1);
    return res.status(200).json(productsArr)
  } else {
    return res.status(404).send(`No Product Found`)
  }
})


// @ GET
// @ ROUTE : /getproducts/:id
app.get('/getproducts/:id', (req, res) => {
  let { id } = req.params;
  let product = productsArr.find(p => p.id == (id));
  if (product) {
    return res.status(200).json(product)
  } else {
    return res.status(404).send(`No Product Found`)
  }
})


// @ PUT
// @ ROUTE : /products/:id
app.put('/products/:id', (req, res) => {
  let { id } = req.params;
  let index = productsArr.findIndex(p => p.id == (id));
  if (index >= 0) {
    let updatedProduct = { ...productsArr[index], ...req.body };
    productsArr[index] = updatedProduct;
    return res.status(200).json(updatedProduct);
  } else {
    return res.status(404).send(`No Product Found`)
  }
})


// @ POST
// @ ROUTE : /products/:id
app.post('/products', (req, res) => {
  let id = productsArr.reduce((acc, cur) => cur.id > acc ? cur.id : acc, 0) + 1;
  let newProduct = { id, ...req.body };
  productsArr.push({ ...newProduct })
  return res.status(201).json(newProduct)
})


// @ GET
// @ ROUTE : /orders
app.get('/orders/', (req, res) => {
  return res.status(200).json(orders)
})

// { name: 'Jack', city: 'Delhi', address: 'Noida Sector. 18', amount: 'Rs. 2450', items: 6 }

// @ POST
// @ ROUTE : /orders
app.post('/orders', (req, res) => {
  let newOrder = { ...req.body };
  orders.push({ ...newOrder })
  return res.status(201).json(newOrder)
})


// @ POST
// @ ROUTE : /login
app.post('/login', (req, res) => {
  let { username, password } = req.body;
  let user = users.find(u => u.username === username && u.password === password);
  if (user) {
    return res.status(200).json(user);
  }
  return res.status(401).send('Invalid Login Credentials')
})
