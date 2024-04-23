const StuffService  = require('./service');
const { body, param, query, validationResult } = require('express-validator');
const models = require ('./../../models');

const Stuff = models.Stuff;
const User = models.User;
const stuffsService = new StuffService({ Stuff, User });

function createStuff(req, res)
{
    const paramsValidation = [
        body('userId').notEmpty().withMessage('UserId is required'),
        body('price').notEmpty().withMessage('Due date is required').isInt().withMessage('Due date must be a number'),
    ]

    Promise.all(paramsValidation.map(validation => validation.run(req)))
    .then(async() => {
        const validationErr = validationResult(req);
        if (!validationErr.isEmpty()){
            return res.status(400).send({
                errors : validationErr.array()
            });
        }

        const response = await stuffsService.createStuff(req.body);
    
        return res.send(response);

    }).catch((err) => {
        return res.status(500).send({
            message : 'Something is wrong !!'
        });
    });

    
}


function updateStuff(req, res)
{
    const paramsValidation = [
        param('_id').notEmpty().withMessage('_id is required'),
        body('userId').notEmpty().withMessage('User ID is required.'),
        body('price').notEmpty().withMessage('Due date is required').isInt().withMessage('Due date must be a number'),
    ]

    Promise.all(paramsValidation.map(validation => validation.run(req)))
    .then(async() => {
        const validationErr = validationResult(req);
        if (!validationErr.isEmpty()){
            return res.status(400).send({
                errors : validationErr.array()
            });
        }

        const response = await stuffsService.updateStuff(req.params._id, req.body);
    
        return res.send(response);

    }).catch((err) => {
        return res.status(500).send({
            message : 'Stuff not found or something went wrong!!'
        });
    });

}

function deleteStuff(req, res)
{
    const paramsValidation = 
    [
        param('_id').notEmpty().withMessage('Stuff ID is required.')
    ]

    Promise.all(paramsValidation.map(validation => validation.run(req)))
    .then(async() => {
        const validationErr = validationResult(req);
        if (!validationErr.isEmpty()){
            return res.status(400).send({
                errors : validationErr.array()
            });
        }

        const response = await stuffsService.deleteStuff(req.params._id);
    
        return res.send(response);

    });

}


module.exports = {
    createStuff,
    updateStuff,
    deleteStuff
}