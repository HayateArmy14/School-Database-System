const express = require("express");
const router = express.Router();
const user = require("../controllers/user");

// create, find, update, dlete
router.get("/", user.view);
router.post("/", user.find);
router.get("/classes", user.lol);

router.get("/add-student", user.form);
router.post("/add-student", user.create);
router.get("/add-class", user.classForm);
router.post("/add-class", user.classCreate);

router.get("/edit-student/:id", user.edit);
router.post("/edit-student/:id", user.update);
router.get("/edit-class/:id", user.classEdit);
router.post("/edit-class/:id", user.classUpdate);

router.get("/view-student/:id", user.viewAll);
router.get("/view-class/:id", user.viewClass);

router.get("/:id", user.delete);
router.get("/classes/:id", user.classDelete);

module.exports = router;
