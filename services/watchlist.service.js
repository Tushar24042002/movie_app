import CustomValidationError from "../Exceptions/CustomException.js";
import { addWishlist, findAllWishlist, findWishlistById } from "../repository/watchlist.repository.js";

export const addNewWishlist = async (req, res, next) => {
    try {
        const newUser = await addWishlist(req);
        res.status(201).json(newUser);
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            next(new CustomValidationError(error.errors));
        } else {
            next(error);
        }
    }
}

export const getAllWishlist = async (req, res) => {
    try {
        const allUsers = await findAllWishlist();
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export const getWishlistById= async(req, res)=>{
    const industryId = req.params.id;
    try {
        const employer = await findWishlistById(industryId);
        if (!employer) {
            throw new CustomValidationError([{ message: 'Indsutry not found' }]);
        }
        res.status(200).json(employer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}