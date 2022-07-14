const express = require("express");
const router = new express.Router();
const conn = require("../db/conn");
const multer = require('multer');


// for img storage
var imgconfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./uploads");
    },
    filename: (req, file, callback) => {
        // const ext = file.mimetype.split("/")[1]; // itmeans k image/png  aavu hoy to png extesion get krvakryu cgw
        callback(null, `image-${Date.now()}.${file.originalname}`)
    }
});

// good filter
const isImage = (req,file,callback)=>{
    if(file.mimetype.startsWith("image")){
        callback(null,true)
    }else{
        callback(new Error("only images is allowd"))
    }   
// const fileFilter = (req, file, cb) => {
//     if (file.mimeType == 'image/jpeg' || file.mimeType == 'image/png') {
//         cb(null, true)
//     } else {
//         cb(new Error("only images is allowd"))
//     }
// }
}

// second filter 

var upload = multer({
    storage: imgconfig,
    // fileFilter:isImage
    limits:{
        fileSize:1024*1020*10
    },
    fileFilter: isImage 
});


// router.post("/set",upload.single("photo"),(req,res)=>{
//     console.log(req.body);
//     console.log(req.file);
// })





// register user data
router.post("/create", upload.single('photo'), (req, res) => {


    const { name, email, age, mobile, work, add, desc, date } = req.body;
    const { filename } = req.file;

    if (!name || !email || !age || !mobile || !work || !add || !desc || !filename) {
        res.status(422).json("fill the all details");
    }

    try {
        conn.query("SELECT * FROM employees WHERE email = ?", email, (err, result) => {

            if (result.length) {
                res.status(422).json("this data is alredy exist")

            } else {

                conn.query("INSERT INTO employees SET ?", { name, email, age, mobile, work, add, desc, imguser: filename, date }, (err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("data added");
                        res.status(201).json(req.body)
                    }
                });
            }
        });

    } catch (error) {
        res.status(422).json(error)
    }


});


// get user data employees
router.get("/employees", (req, res) => {

    console.log(req.query); 

    const {search,page} = req.query;

    let cond = ""

    if(search){
         cond += `WHERE name Like "%${search}%" `
    }


    conn.query(`SELECT * FROM employees ${cond}`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.status(201).json(result);
            console.log(result);
        }
    })
});


// user delete query
router.delete("/deleteuser/:id", (req, res) => {

    const { id } = req.params;

    conn.query("DELETE  FROM employees WHERE id = ?", id, (err, result) => {
        if (err) {
            res.status(422).json({ message: "error" });
        } else {
            res.status(201).json(result);
        }
    })
});



// get individual user
router.get("/getuser/:id", (req, res) => {
    const { id } = req.params;

    conn.query("SELECT * FROM employees WHERE id = ?", id, (err, result) => {
        if (err) {
            res.status(422).json({ message: "error" });
        } else {
            res.status(201).json(result);
            // console.log(result);
        }
    })

});


// update user data

router.put("/updateuser/:id",upload.single('photo'), (req, res) => {
    const { id } = req.params;
    // console.log(id);
    console.log(req.body);
    // console.log(req.file);

    const {name, email, age, mobile, work, add, desc,photo} = req.body;
    const file = req.file ? req.file.filename : photo;
    console.log(file);
    

    conn.query("UPDATE employees SET ?  WHERE id = ?", [{ name, email, age, mobile, work, add, desc, imguser: file }, id], (err, result) => {
        if (err) {
            res.status(422).json({ message: "error" });
            console.log("error");
        } else {
            console.log(result);
            res.status(201).json(result);
        }
    })
})

module.exports = router;