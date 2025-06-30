const express=require("express");
const router=express.Router();

const contact=require("../controllers/contact-controller");
const {contactSchema}=require("../validators/auth-validator");
const validate=require("../mildlewares/validate-midleware");
router.route("/contact").post(validate(contactSchema),contact.contactform);

module.exports =router;