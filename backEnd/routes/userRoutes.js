const express = require('express');
const userRoutes = express.Router();
const userController = require('../controller/userController');

userRoutes.post('/register',userController.registerUser);

userRoutes.get('/', (req, res) => {
  res.send(` 

    <div style="display: flex;justify-content: center;align-items: center;height: 100vh">

      <h1 style="font-size: 50px; text-align: center">Bem vindo ao Servido da Loja de Hardware</h1>
      <p>
        <a href="/login">clique aqui</a>
      </p>

    </div>
    
    
    `);
});

userRoutes.post('/login', userController.login);

userRoutes.delete('/delete',userController.deleteUser);

module.exports = userRoutes;