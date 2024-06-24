import WatchlistItem from "../models/WatchlistItem.js";
export const addWishlist = async (req) => {
  const data = await WatchlistItem.create(req.body);
  return data;
};

export const findAllWishlist = async () => {
  return await WatchlistItem.findAll();
};

export const findWishlistById = async (id) => {
  return await WatchlistItem.findByPk(id);
};
