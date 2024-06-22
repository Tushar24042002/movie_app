import Job from "../models/Job.js";

export const addJobProfile= async(req)=>{
        const data = await Job.create(req.body);
        return data;
}


export const findAllJobs= async()=>{
        return await Job.findAll();
}

export const findJobById = async(id)=>{
        return await Job.findByPk(id);
}