import jwt from 'jsonwebtoken';
import {search_product} from "../src/controllers/productController.js"



     function ensureAuth(req, res, next) {
        console.log("mid____ensureAuth_______chk")
      if (req.isAuthenticated()) {
        return next()
      } else {
        res.redirect('/')
      }
    } 
    function ensureGuest (req, res, next) {
        console.log("mid____ensureGuest_______chk")

      if (!req.isAuthenticated()) {
        return next();
      } else {
        res.redirect('/log');
      }
    }

    function admin_auth(req, res, next){
      console.log("chek______________________________________________middleware___"+req.headers.admin_token)
      
      if(req.headers.admin_token!="" && req.headers.admin_token!=undefined){
        if(req.headers.admin_token=="admin_master_token=we2code_123456"){
          next()
        }else{
          res.send({"error":"token not match"})
        }
      }else if(req.headers.vendor_token!=""&&req.headers.vendor_token!=undefined){
        if(req.headers.vendor_token=="vendor_master_token=we2code_123456"){
          next()
        }else{
          res.send({"error":"token not match"})
        }
      }else{
        res.send({"error":"token error"})
      }
      
    }

    function auth_user(req, res, next){
    try{
      console.log("chek______________________________________________middleware___"+req.headers.user_token)
      let token = jwt.verify(req.headers.user_token,  process.env.USER_JWT_SECRET_KEY);
      console.log(token)
      console.log(token.id)
     
      if(req.headers.user_token!="" && req.headers.user_token!=undefined){
        req.user_id=token.id

        next()
      }else{
        res.send({"error":"token error"})
      }
      
    }catch(err){
      res.status(401).send(err)
    }
    }

function fetch_user(req, res, next){
  if('admin_token' in req.headers){
    console.log("chek______________________________________________middleware___"+req.headers.admin_token)
    if(req.headers.admin_token!="" && req.headers.admin_token!=undefined){
      if(req.headers.admin_token=="admin_master_token=we2code_123456"){
        req.for_="admin"
        next()
      }else{
        res.send({"error":"admin token not match"})
      }
    }else{
      res.send({"error":"vendor token not match"})
    }


  }else if('user_token' in req.headers){
    try{
      console.log("chek______________________________________________middleware___"+req.headers.user_token)
      let token = jwt.verify(req.headers.user_token,  process.env.USER_JWT_SECRET_KEY);
      console.log(token)
     
      if(req.headers.user_token!="" && req.headers.user_token!=undefined){
        req.user_id=token.id
        req.for_="user"
        next()
      }else{
        res.send({"error":"user token error"})
      }
      
    }catch(err){
      res.send({"error":"user token error"})
    }
  }else if(req.headers.user_blank=="true"){
    search_product(req,res)
  }else{
    res.send({"error":"send only vendor, user, admin token"})
  }
}

  export{ensureAuth , ensureGuest, admin_auth, auth_user,fetch_user}
  