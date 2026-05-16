const { addCollege ,getAllcolleges,deleteCollege,getCollageById,updateCollegeDetails,
    updateCollegeEmail
} = require('../controller/collageController');
const express = require('express');
const router = express.Router();

router.post("/add-collage",addCollege);
router.get("/get-collages",getAllcolleges );
router.delete("/delete-collages/:id",deleteCollege );
router.get("/get-collages/:id",getCollageById );
router.put("/update-collages/:id",updateCollegeDetails);
router.patch("/update-email/:id",updateCollegeEmail);


module.exports = router;