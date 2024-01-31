const express=require('express');
const app=express();
const router=express.Router();

const {loginUser,logoutUser,signinUser,updatePassword}=require('../controllers/user.js');

router.post('/signin',signinUser);
router.post('/login',loginUser);
router.get('/logout',logoutUser);
router.put('/updatePassword',updatePassword);

module.exports=router;