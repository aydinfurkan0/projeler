// server.js - Node.js server with Express and Socket.io

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '.'))); // Static dosyaları servis et (index.html, styles.css, script.js)

// In-memory data stores
let products = [
  { id: 1, barcode: '8690504000123', name: 'Ekmek', price: 3.50, cost: 2.00, category: 'Temel Gıda', stock: 50, minStock: 10 },
  { id: 2, barcode: '8690504000124', name: 'Süt 1L', price: 8.75, cost: 6.50, category: 'Süt Ürünleri', stock: 30, minStock: 5 },
  { id: 3, barcode: '8690504000125', name: 'Kalem', price: 2.25, cost: 1.50, category: 'Kırtasiye', stock: 100, minStock: 20 },
  { id: 4, barcode: '8690504000126', name: 'Çay Bardağı', price: 15.00, cost: 8.00, category: 'Mutfak', stock: 25, minStock: 5 },
  { id: 5, barcode: '8690504000127', name: 'Hamburger', price: 25.50, cost: 12.00, category: 'Fast Food', stock: 20, minStock: 3 },
  { id: 6, barcode: '8690504000128', name: 'Kola 330ml', price: 4.50, cost: 2.75, category: 'İçecek', stock: 15, minStock: 10 },
  { id: 7, barcode: '8690504000129', name: 'Çikolata', price: 12.00, cost: 8.50, category: 'Atıştırmalık', stock: 2, minStock: 5 },
  { id: 8, barcode: '8690504000130', name: 'Su 500ml', price: 1.50, cost: 0.75, category: 'İçecek', stock: 80, minStock: 20 }
];

let customers = [
  { id: 1, name: 'Ahmet Yılmaz', phone: '0532 123 4567', email: 'ahmet@email.com', points: 150, totalSpent: 1250, visits: 12 },
  { id: 2, name: 'Fatma Kaya', phone: '0541 987 6543', email: 'fatma@email.com', points: 89, totalSpent: 890, visits: 8 },
  { id: 3, name: 'Mehmet Demir', phone: '0555 555 5555', email: 'mehmet@email.com', points: 234, totalSpent: 2340, visits: 18 }
];

// Products API
app.get('/products', (req, res) => {
  res.json(products);
});

app.post('/products', (req, res) => {
  const newProduct = { ...req.body, id: products.length + 1 };
  products.push(newProduct);
  io.emit('product-added', newProduct);
  res.json(newProduct);
});

app.put('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);
  if (index !== -1) {
    products[index] = { ...products[index], ...req.body };
    io.emit('product-updated', products[index]);
    res.json(products[index]);
  } else {
    res.status(404).send('Product not found');
  }
});

app.delete('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  products = products.filter(p => p.id !== id);
  io.emit('product-deleted', id);
  res.sendStatus(204);
});

// Customers API
app.get('/customers', (req, res) => {
  res.json(customers);
});

app.post('/customers', (req, res) => {
  const newCustomer = { ...req.body, id: customers.length + 1 };
  customers.push(newCustomer);
  io.emit('customer-added', newCustomer);
  res.json(newCustomer);
});

app.put('/customers/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = customers.findIndex(c => c.id === id);
  if (index !== -1) {
    customers[index] = { ...customers[index], ...req.body };
    io.emit('customer-updated', customers[index]);
    res.json(customers[index]);
  } else {
    res.status(404).send('Customer not found');
  }
});

app.delete('/customers/:id', (req, res) => {
  const id = parseInt(req.params.id);
  customers = customers.filter(c => c.id !== id);
  io.emit('customer-deleted', id);
  res.sendStatus(204);
});

// Process payment (simulate)
app.post('/process-payment', (req, res) => {
  const { cart, paymentMethod, total, customerId } = req.body;
  // Update stocks
  cart.forEach(item => {
    const product = products.find(p => p.id === item.id);
    if (product) {
      product.stock -= item.quantity;
      io.emit('product-updated', product);
    }
  });
  // Update customer if exists
  if (customerId) {
    const customer = customers.find(c => c.id === customerId);
    if (customer) {
      customer.totalSpent += total;
      customer.points += Math.floor(total / 10); // Example point system
      customer.visits += 1;
      io.emit('customer-updated', customer);
    }
  }
  res.json({ success: true });
});

// Socket.io connection
io.on('connection', (socket) => {
  console.log('A client connected');
  socket.on('disconnect', () => {
    console.log('A client disconnected');
  });
});

const PORT = 1999;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});