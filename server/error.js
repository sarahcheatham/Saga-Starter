const handleSQLError = (res, err) => {
    console.log("HANDLE SQL ERROR:", err)
    return res.status(500).send("An unexpected error occured");
}

module.exports = { handleSQLError }