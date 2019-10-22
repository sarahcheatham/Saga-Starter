const db = require('ibm_db');
const { handleSQLError } = require("../error");
require("dotenv").config();
const connectionString = process.env.CONNSTR;

const userQuery = "SELECT * FROM NYACOL.USERPROFILE WHERE USERID = ? ;"

const getUserInfo = (req, res) => {
    const replacement = [`${req.params.userId}`];
    db.open(connectionString, function(err, conn){
        if (err) return err;
        conn.query(userQuery, replacement, (error1, rows) => {
            console.log(req.params.userId)
            if(error1){
                return handleSQLError(res, error1)
            }
            return res.json(...rows)
        });
        conn.close(function(error2) {
            if(error2){
                console.log("CLOSE ERROR:", error2)
            }
        });
    })
}

module.exports = { getUserInfo };