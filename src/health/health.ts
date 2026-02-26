import express from 'express';

const routerHealth = express.Router();

routerHealth.get('/',  (req, res) => {
    res.status(200).send('well come to infobeatlive');
  });

export default routerHealth;
