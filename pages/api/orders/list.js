import nc from 'next-connect';
import Order from '../../../models/Order';
import db from './../../utils/db.js';

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  const orders = await Order.find({});
  await db.disconnect();
  res.send(orders);
});

export default handler;
