const Colleges = require("../model/CollegeModel");
//add college
const addCollege = async (req, res) => {
    try {
        const { name, code, address, departments, email, url } = req.body;
        const newCollege = {
            name: name,
            code: code,
            address: address,
            departments: departments,
            email: email,
            url: url
        }
        await Colleges.create(newCollege);
        res.status(200).json({ message: "College added successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error occurred while adding college" })
        console.log(err);
    }
};
const getAllcolleges = async (req, res) => {
    try {
        const foundColleges = await Colleges.find()
        if (!foundColleges) {
            res.status(400).json({ message: "colleges not found" })
        }
        res.status(200).json({ foundColleges })
    } catch (error) {
        res.status(500).json({ message: "faild to retrive data" })
    }
}
const deleteCollege = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCollege = await Colleges.findByIdAndDelete(req.params.id);
        if (!deletedCollege) {
            res.status(400).json({ message: "College not found" })
        }
        res.status(200).json({ message: "College deleted successfully" })
    } catch (error) {
        res.status(500).json({ message: "Failed to delete college" })
    }
    module.exports = { addCollege, getAllcolleges };
}