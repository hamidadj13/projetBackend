const TaskService  = require('./service');
const { body, param, query, validationResult } = require('express-validator');
const models = require ('./../../models');

const Task = models.Task;
const User = models.User;
const tasksService = new TaskService({ Task, User });

function createTask(req, res)
{
    const paramsValidation = [
        body('userId').notEmpty().withMessage('UserId is required'),
        body('dueDate').notEmpty().withMessage('Due date is required').isISO8601().withMessage('Due date must be a valid date'),
    ]

    Promise.all(paramsValidation.map(validation => validation.run(req)))
    .then(async() => {
        const validationErr = validationResult(req);
        if (!validationErr.isEmpty()){
            return res.status(400).send({
                errors : validationErr.array()
            });
        }

        const response = await tasksService.createTask(req.body);
    
        return res.send(response);

    }).catch((err) => {
        return res.status(500).send({
            message : 'Something is wrong !!'
        });
    });

    
}


function updateTask(req, res)
{
    const paramsValidation = [
        param('_id').notEmpty().withMessage('_id is required'),
        body('userId').notEmpty().withMessage('User ID is required.'),
        body('dueDate').optional().isISO8601().withMessage('DueDate must be a valid date')
        
    ]   

    Promise.all(paramsValidation.map(validation => validation.run(req)))
    .then(async() => {
        const validationErr = validationResult(req);
        if (!validationErr.isEmpty()){
            return res.status(400).send({
                errors : validationErr.array()
            });
        }

        const response = await tasksService.updateTask(req.params._id, req.body);
    
        return res.send(response);

    }).catch((err) => {
        return res.status(500).send({
            message : 'Utilisateur non retrouvé !!'
        });
    });

}

function deleteTask(req, res)
{
    const paramsValidation = 
    [
        param('_id').notEmpty().withMessage('Task ID is required.')
    ]

    Promise.all(paramsValidation.map(validation => validation.run(req)))
    .then(async() => {
        const validationErr = validationResult(req);
        if (!validationErr.isEmpty()){
            return res.status(400).send({
                errors : validationErr.array()
            });
        }

        const response = await tasksService.deleteTask(req.params._id);
    
        return res.send(response);

    });

}


module.exports = {
    createTask,
    updateTask,
    deleteTask
}