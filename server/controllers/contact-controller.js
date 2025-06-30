const Contact=require("../models/contact-model");

const contactform=async(req,res)=>{
try {
    const response=req.body;
    await Contact.create(response);//it will add in the database as contacts
    return res.status(200).json({message:"message send successfully"});
} catch (error) {
    res.status(400).json({message:"message not delivered"});
}
};

module.exports={contactform};