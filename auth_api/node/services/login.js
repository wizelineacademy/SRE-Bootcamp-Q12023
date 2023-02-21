export const loginFunction = (username, password) => {
// https://www.npmjs.com/package/sync-sql
    const syncSql = require('sync-sql');
    var salida = new syncSql.mysql(
        {
        host     : "sre-bootcamp-selection-challenge.cabf3yhjqvmq.us-east-1.rds.amazonaws.com",
        port     : "3306",
        user     : "secret",
        password : "jOdznoyH6swQB9sTGdLUeeSrtejWkcw",
        database : "bootcamp_tht"
        },
        "Select * from users where username='" + username + "'"
    );
   //     return(JSON.stringify(salida)) ;
    if (salida.data.rows.length == 0)
        return ("not_found");
    // the user exists
    // take the password, salt and hash it
    // https://www.nodejsera.com/snippets/nodejs/sha512-hash.html
    let salt=salida.data.rows[0].salt;
    let salted_pass=password + salt;
    var crypto= require('crypto');
    var hash= crypto.createHash('sha512');
    let data= hash.update(salted_pass,'utf-8');
    let gen_data= data.digest('hex');
    if (gen_data != salida.data.rows[0].password)
        return ("not_found");
    // password passed
    const jwt = require ('jsonwebtoken');
    const token = jwt.sign ({
            'role' : salida.data.rows[0].role
    }, 'my2w7wjd7yXF64FIADfJxNs1oupTGAuW',{noTimestamp:true});
    return (token);
}
