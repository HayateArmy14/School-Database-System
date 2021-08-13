const mysql = require("mysql");

// Connection Pool
const pool = mysql.createPool({
  connectionLimit: 100,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// View Users
exports.view = (req, res) => {
  //Connect to DB
  pool.getConnection((err, connection) => {
    if (err) throw err; // not connected
    console.log("Connected As ID" + connection.threadId);

    //User the conncet
    connection.query("SELECT * FROM user", (err, rows) => {
      // When done with the connection , releaswe it
      connection.release();

      if (!err) {
        let removedStudent = req.query.removed;
        res.render("home", { rows, removedStudent });
      } else {
        console.log(err);
      }
      console.log("The data from user table: ", rows);
    });
  });
};

//Find User By Search
exports.find = (req, res) => {
  //Connect to DB
  pool.getConnection((err, connection) => {
    if (err) throw err; // not connected
    console.log("Connected As ID" + connection.threadId);

    let searchTerm = req.body.search;

    //User the conncet
    connection.query(
      "SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ?",
      ["%" + searchTerm + "%", "%" + searchTerm + "%"],
      (err, rows) => {
        // When done with the connection , releaswe it
        connection.release();

        if (!err) {
          res.render("home", { rows });
        } else {
          console.log(err);
        }
        console.log("The data from user table: ", rows);
      }
    );
  });
};

exports.form = (req, res) => {
  res.render("add-student");
};

// Add New User
exports.create = (req, res) => {
  const {
    first_name,
    last_name,
    phone,
    parent_phone,
    payment_status,
    comments,
    class_id,
  } = req.body;

  //Connect to DB
  pool.getConnection((err, connection) => {
    if (err) throw err; // not connected
    console.log("Connected As ID" + connection.threadId);

    let searchTerm = req.body.search;

    //User the conncet
    connection.query(
      "INSERT INTO user SET first_name = ?, last_name = ?, phone = ?, parent_phone = ?, payment_status = ?, comments = ?, class_id = ?",
      [
        first_name,
        last_name,
        phone,
        parent_phone,
        payment_status,
        comments,
        class_id,
      ],
      (err, rows) => {
        // When done with the connection , releaswe it
        connection.release();

        if (!err) {
          res.render("add-student", { alert: "User Added Successfully", rows });
        } else {
          console.log(err);
        }
        console.log("The data from user table: ", rows);
      }
    );
  });
};

//Edit Student
exports.edit = (req, res) => {
  //Connect to DB
  pool.getConnection((err, connection) => {
    if (err) throw err; // not connected
    console.log("Connected As ID" + connection.threadId);

    //User the conncet
    connection.query(
      "SELECT * FROM user WHERE id = ?",
      [req.params.id],
      (err, rows) => {
        // When done with the connection , releaswe it
        connection.release();

        if (!err) {
          res.render("edit-student", { rows });
        } else {
          console.log(err);
        }
        console.log("The data from user table: ", rows);
      }
    );
  });
};

//Update Student
exports.update = (req, res) => {
  const {
    first_name,
    last_name,
    phone,
    parent_phone,
    payment_status,
    comments,
    class_id,
  } = req.body;
  //Connect to DB
  pool.getConnection((err, connection) => {
    if (err) throw err; // not connected
    console.log("Connected As ID" + connection.threadId);

    //User the conncet
    connection.query(
      "UPDATE user SET first_name = ?, last_name = ?, phone = ?, parent_phone = ?, payment_status = ?, comments = ?, class_id = ? WHERE id = ?",
      [
        first_name,
        last_name,
        phone,
        parent_phone,
        payment_status,
        comments,
        class_id,
        req.params.id,
      ],

      (err, rows) => {
        // When done with the connection , releaswe it
        connection.release();

        if (!err) {
          //Connect to DB
          pool.getConnection((err, connection) => {
            if (err) throw err; // not connected
            console.log("Connected As ID" + connection.threadId);

            //User the conncet
            connection.query(
              "SELECT * FROM user WHERE id = ?",
              [req.params.id],
              (err, rows) => {
                // When done with the connection , releaswe it
                connection.release();

                if (!err) {
                  res.render("edit-student", {
                    rows,
                    alert: `${first_name} has Been Updated`,
                  });
                } else {
                  console.log(err);
                }
                console.log("The data from user table: ", rows);
              }
            );
          });
        } else {
          console.log(err);
        }
        console.log("The data from user table: ", rows);
      }
    );
  });
};

//Delete Student
exports.delete = (req, res) => {
  //Connect to DB
  pool.getConnection((err, connection) => {
    if (err) throw err; // not connected
    console.log("Connected As ID" + connection.threadId);

    //User the conncet
    connection.query(
      "DELETE FROM user WHERE id = ?",
      [req.params.id],
      (err, rows) => {
        // When done with the connection , releaswe it
        connection.release();
        if (!err) {
          let removedStudent = encodeURIComponent(
            "Student Successfully Removed"
          );
          res.redirect("/?removed=" + removedStudent);
        } else {
          console.log(err);
        }
        console.log("The data from user table: ", rows);
      }
    );
  });
};

// View Users
exports.viewAll = (req, res) => {
  //Connect to DB
  pool.getConnection((err, connection) => {
    if (err) throw err; // not connected
    console.log("Connected As ID" + connection.threadId);

    //User the conncet
    connection.query(
      "SELECT * FROM user WHERE id = ?",
      [req.params.id],
      (err, rows) => {
        // When done with the connection , releaswe it
        connection.release();

        if (!err) {
          res.render("view-student", { rows });
        } else {
          console.log(err);
        }
        console.log("The data from user table: ", rows);
      }
    );
  });
};

// View Classes
exports.lol = (req, res) => {
  //Connect to DB
  pool.getConnection((err, connection) => {
    if (err) throw err; // not connected
    console.log("Connected As ID" + connection.threadId);

    //User the conncet
    connection.query("SELECT * FROM class", (err, rows) => {
      // When done with the connection , releaswe it
      connection.release();

      if (!err) {
        let removedClass = req.query.removed;
        res.render("classes", { rows, removedClass });
      } else {
        console.log(err);
      }
      console.log("The data from user table: ", rows);
    });
  });
};

exports.viewClass = (req, res) => {
  //  //Connect to DB
  pool.getConnection((err, connection) => {
    if (err) throw err; // not connected
    console.log("Connected As ID" + connection.threadId);

    //User the conncet
    connection.query(
      // "SELECT user.first_name, user.last_name, class.class_id FROM user JOIN class ON user.class_id = class.class_id= ?",
      // [req.params.id],
      "SELECT * from user WHERE class_id = ?",
      [req.params.id],
      (err, rows) => {
        // When done with the connection , releaswe it
        connection.release();

        if (!err) {
          res.render("view-class", { rows });
        } else {
          console.log(err);
        }
        console.log("The data from user table: ", rows);
      }
    );
  });
};

exports.classForm = (req, res) => {
  res.render("add-class");
};

exports.classCreate = (req, res) => {
  const { class_name, class_cat } = req.body;

  //Connect to DB
  pool.getConnection((err, connection) => {
    if (err) throw err; // not connected
    console.log("Connected As ID" + connection.threadId);

    let searchTerm = req.body.search;

    //User the conncet
    connection.query(
      "INSERT INTO class SET class_name = ?, class_cat = ?",
      [class_name, class_cat],
      (err, rows) => {
        // When done with the connection , releaswe it
        connection.release();

        if (!err) {
          res.render("add-class", { alert: "Class Added Successfully" });
        } else {
          console.log(err);
        }
        console.log("The data from user table: ", rows);
      }
    );
  });
};

//Edit Class
exports.classEdit = (req, res) => {
  //Connect to DB
  pool.getConnection((err, connection) => {
    if (err) throw err; // not connected
    console.log("Connected As ID" + connection.threadId);

    //User the conncet
    connection.query(
      "SELECT * FROM class WHERE class_id = ?",
      [req.params.id],
      (err, rows) => {
        // When done with the connection , releaswe it
        connection.release();

        if (!err) {
          res.render("edit-class", { rows });
        } else {
          console.log(err);
        }
        console.log("The data from user table: ", rows);
      }
    );
  });
};

//Update Class
exports.classUpdate = (req, res) => {
  const { class_name, class_cat } = req.body;
  //Connect to DB
  pool.getConnection((err, connection) => {
    if (err) throw err; // not connected
    console.log("Connected As ID" + connection.threadId);

    //User the conncet
    connection.query(
      "UPDATE class SET class_name = ?, class_cat = ? WHERE class_id = ?",
      [class_name, class_cat, req.params.id],

      (err, rows) => {
        // When done with the connection , releaswe it
        connection.release();

        if (!err) {
          //Connect to DB
          pool.getConnection((err, connection) => {
            if (err) throw err; // not connected
            console.log("Connected As ID" + connection.threadId);

            //User the conncet
            connection.query(
              "SELECT * FROM class WHERE class_id = ?",
              [req.params.id],
              (err, rows) => {
                // When done with the connection , releaswe it
                connection.release();

                if (!err) {
                  res.render("edit-class", {
                    rows,
                    alert: `${class_name} has Been Updated`,
                  });
                } else {
                  console.log(err);
                  console.log("lasd");
                }
                console.log("The data from user table: ", rows);
              }
            );
          });
        } else {
          console.log(err);
        }
        console.log("The data from user table: ", rows);
      }
    );
  });
};

//Delete Student
exports.classDelete = (req, res) => {
  //Connect to DB
  pool.getConnection((err, connection) => {
    if (err) throw err; // not connected
    console.log("Connected As ID" + connection.threadId);

    //User the conncet
    connection.query(
      "DELETE FROM class WHERE class_id = ?",
      [req.params.id],
      (err, rows) => {
        // When done with the connection , releaswe it
        connection.release();
        if (!err) {
          let removedClass = encodeURIComponent("Class Successfully Removed");
          res.redirect("/?removed=" + removedClass);
        } else {
          console.log(err);
        }
        console.log("The data from user table: ", rows);
      }
    );
  });
};
