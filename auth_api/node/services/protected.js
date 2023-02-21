/*export const protectFunction = (authorization) => {
    let splitted=authorization.split(' ');
    let token="";
    switch (splitted.length) {
        case 1:
            token=splitted[0];
            break;
        case 2:
            if (splitted[0] != 'Bearer')
                 return "forbidden";
            token=splitted[1];
            break;
        case 3:
            if (!token) 
              return "forbidden";
        case 4:
          const decodedToken = jwt.decode(token);
          if (decodedToken.role === "admin") {
              return "You are under protected data";
               } else {
          return "forbidden";}
        default:
            return "forbidden";
            break;
    }
  const parts = token.split(".");
  if (parts.length !== 3) {
    return "jwt malformed";
  }
  const payload = Buffer.from(parts[1], "base64").toString();
  const { role } = JSON.parse(payload);
  if (role !== "admin") {
    return "forbidden";
  }
    const jwt= require ('jsonwebtoken');
    try {
        let decoded =jwt.verify(token,'my2w7wjd7yXF64FIADfJxNs1oupTGAuW',{noTimestamp:true});
        return "You are under protected data";
    } catch (e) {
        return e.message;
    }
}*/

export const protectFunction = (authorization) => {
    if (!authorization) {
        return "forbidden";
    }

    let splitted = authorization.split(' ');
    let token = "";

    switch (splitted.length) {
        case 1:
            token = splitted[0];
            break;
        case 2:
            if (splitted[0] != 'Bearer') {
                return "forbidden";
            }
            token = splitted[1];
            break;
        case 3:
            token = splitted[2];
            break;
        case 4:
            token = splitted[3];
            const decodedToken = jwt.decode(token);
            if (decodedToken.role === "admin") {
                return "You are under protected data";
            } else {
                return "forbidden";
            }
        default:
            return "forbidden";
    }

    const parts = token.split(".");
    if (parts.length !== 3) {
        return "jwt malformed";
    }
    const payload = Buffer.from(parts[1], "base64").toString();
    const { role } = JSON.parse(payload);
    if (role !== "admin") {
        return "forbidden";
    }

    const jwt = require('jsonwebtoken');
    try {
        let decoded = jwt.verify(token,'my2w7wjd7yXF64FIADfJxNs1oupTGAuW',{noTimestamp:true});
          return "You are under protected data";
        } catch (e) {
          return e.message;
  } 
}
