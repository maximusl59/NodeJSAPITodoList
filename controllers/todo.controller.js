const Todo = require('./../models/todo.model')
const mongoose = require('mongoose')
const { Validator } = require('node-input-validator');
exports.create=async(req,res)=>{

  const v = new Validator(req.body, {
    todoName: 'required|minLength:1|maxLength:100',
    todoCategory: 'required' 
  });
  const matched = await v.check();

  if(!matched) {
      return res.status(422).send(v.errors);
  }
  try {
    const todo = new Todo({
      todoName:req.body.todoName,
      todoCategory:req.body.todoCategory,
      todoOwner:req.user._id
    });
    let todoData = await todo.save();
    return res.status(201).send({
      message:'Todo item created successfully',
      data:todoData
    })
  } catch(err) {
    return res.status(400).send({
      message:err.message,
      data:err
    })
  }
}

exports.view=async(req,res)=>{
  
  let query={};
  if(req.query.todoCategory){
    query.todoCategory=req.query.todoCategory;
  }
  let todos = await Todo.find(query)
  .populate('todoCategory');
  return res.status(200).send({
    message:'Todos successfully fetched',
    data:todos
  });
}

exports.update=async(req,res)=>{
    let todo_id = req.params.todo_id;
    Todo.findOne({_id:todo_id}).then(async(todo)=>{
      if(!todo) {
        return res.status(400).send({
          message:'Todo not found',
          data:{}
        });
      } else {
        let current_user = req.user;

        if(todo.todoOwner != current_user._id) {
          return res.status(400).send({
            message:'Access denied',
            data:{}
          });
        } else {
          try{
            const v = new Validator(req.body, {
              todoName: 'required|minLength:1|maxLength:100',
              todoCategory: 'required' 
            });
            const matched = await v.check();
          
            if(!matched) {
                return res.status(422).send(v.errors);
            }

            await Todo.updateOne({_id:todo_id}, {
              todoName:req.body.todoName,
              todoCategory:req.body.todoCategory
            });

            let todos = await Todo.findOne({_id:todo_id})
            return res.status(200).send({
              message:'Todo item successfully updated',
              data:todos
            });
          } catch(err) {
            return res.status(400).send({
              message:err.message,
              data:err
            })
          }
        }
      }
    })
}

exports.remove=async(req,res)=>{
    let todo_id = req.params.todo_id;
    Todo.findOne({_id:todo_id}).then(async(todo)=>{
      if(!todo) {
        return res.status(400).send({
          message:'Todo not found',
          data:{}
        });
      } else {
        let current_user = req.user;

        if(todo.todoOwner != current_user._id) {
          return res.status(400).send({
            message:'Access denied',
            data:{}
          });
        } else {
          try{
            
            await Todo.deleteOne({_id:todo_id});

            return res.status(200).send({
              message:'Todo item successfully deleted',
              data:{}
            });
          } catch(err) {
            return res.status(400).send({
              message:err.message,
              data:err
            })
          }
        }
      }
    })
}