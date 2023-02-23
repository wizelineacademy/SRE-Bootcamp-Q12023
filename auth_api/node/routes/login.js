import { loginFunction } from '../services/login';

export const login = (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;
  let respuesta=loginFunction(username, password);
/*
 * let response = {
    "data": loginFunction(username, password)
  };
  if (response.data!="not found!")
      res.send(response);
  else
      res.sendStatus(403);
      */
    if (respuesta=="not_found")
        //res.send ("quibo");
        res.sendStatus(403);
    else
        res.send ({ "data" : respuesta });

  next();
}
