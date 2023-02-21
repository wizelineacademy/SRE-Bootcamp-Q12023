export const protectFunction = (authorization) => {
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
        default:
            return "forbidden";
            break;
    }
    const jwt= require ('jsonwebtoken');
    try {
        let decoded =jwt.verify(token,'my2w7wjd7yXF64FIADfJxNs1oupTGAuW');
        return "You are under protected data";
    } catch (e) {
        return e.message;
    }
}
