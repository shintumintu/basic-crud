import express from 'express';
import {v4 as uuidv4} from 'uuid';

const router = express.Router();

let users =[
    {
        "name":"Kumaresan",
        "lastName":"Jaganathan",
        "age":23
    }
];


//all routes in here are staring with /users.

router.get('/',(req, res) =>{
    res.send(users);
});

router.post('/',(req,res) =>{
    const user =req.body;
    const userWithId = {...user,id: uuidv4()}
    users.push(userWithId);
    res.send(`User with name ${user.name} added to the database`);
});
// /users/2 => req.params{id:2}
router.get('/:id',(req,res) =>{
    const {id} =req.params;
    const foundUser = users.find((user) => user.id ===id);
    res.send(foundUser);
});

router.delete('/:id',(req,res) =>{
 const{id} =req.params;

 // id to delete 123
 // kumaresa 123
 //deekasha 321
 users = users.filter((user) => user.id !== id);

 res.send(`User with id ${id} deleted from the database.`)
});

router.patch('/:id',(req,res) =>{
    const{id} =req.params;
    const {name ,lastName,age} =req.body;
    const user = users.find((user) => user.id === id);
    if(name){
        user.name = name;
    }
    if(lastName){
        user.lastName = lastName;
    }
    if(age){
        user.age = age;
    }
    
   
    res.send(`User with id ${id} has been updated.`)
   });
export default router;