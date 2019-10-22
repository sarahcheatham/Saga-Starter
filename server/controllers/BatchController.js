const db = require("ibm_db");
const { handleSQLError } = require("../error");
require("dotenv").config();
const connectionString = process.env.CONNSTR;

// for pie chart
const getBatchStatus = (req, res) => {
    const SP = `CALL NYACOL.DBBR0020Q(${req.params.secid})`;

    db.open(connectionString, function(err, conn) {
        if (err) return err;
        conn.query(SP, (error1, rows) => {
            if(error1){
                handleSQLError(res, error1);
            }
            return res.json(...rows);
        });
        conn.close(function(error2) {
            if(error2){
                console.log("CLOSE ERROR:", error2)
            }
        });
    });
};

module.exports = { getBatchStatus };