process.env.ALLOWED_AUDIENCES = 'https://api.example.com/products';

import express from 'express';
import { auth, requiredScopes } from 'express-oauth2-bearer';

const ProductsApiApp = express();
ProductsApiApp.use(auth());

ProductsApiApp.get('/products', requiredScopes('read:products'), (req, res) => {
  res.json([
    { id: 1, name: 'Football boots' },
    { id: 2, name: 'Running shoes' },
    { id: 3, name: 'Flip flops' },
  ]);
});

export default ProductsApiApp;
