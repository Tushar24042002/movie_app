import Industry from "../models/Industry.js";

export const addIndustries = async (req) => {
  const data = await Industry.create(req.body);
  return data;
};

export const findAllIndustry = async () => {
  return await Industry.findAll();
};

export const findIndustryById = async (id) => {
  return await Industry.findByPk(id);
};
