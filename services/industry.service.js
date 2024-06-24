import CustomValidationError from "../Exceptions/CustomException.js";
import { addIndustries, findAllIndustry, findIndustryById } from "../repository/industry.repository.js";

export const addIndustry = async (req, res, next) => {
    try {
        const newUser = await addIndustries(req);
        res.status(201).json(newUser);
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            next(new CustomValidationError(error.errors));
        } else {
            next(error);
        }
    }
}

export const getAllIndustry = async (req, res) => {
    try {
        const allUsers = await findAllIndustry();
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export const getIndustryById= async(req, res)=>{
    const industryId = req.params.id;
    try {
        const employer = await findIndustryById(industryId);
        if (!employer) {
            throw new CustomValidationError([{ message: 'Indsutry not found' }]);
        }
        res.status(200).json(employer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}