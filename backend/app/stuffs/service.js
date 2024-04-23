const { query } = require("express");

class StuffService 
{
    constructor({ Stuff, User }) 
    {
        this.Stuff = Stuff;
        this.User = User;
    }

    async createStuff(stuffData) 
    {
        // rechercher si l'utilisateur existe
        const { userId } = stuffData;
        const _user = await this.User.findById(userId);

        if(!_user)
        {
            return{
                message : 'User not found'
            };
        } 
        
        // Création du stuff
        const _stuff = await this.Stuff.create(stuffData);

        //Ensuite on va ajouter ce stuff aux stuffs de l'utilisateur
        _user.stuffs.push(_stuff);
        await _user.save(); // On enregistre

        return{
            message: 'sSuff created successfully !!',
            stuff: _stuff
        };
        
    }

    async updateStuff(stuffId, stuffData) 
    {
        const _stuff = await this.stuff.findByIdAndUpdate(stuffId, stuffData, {new: true});

        if(_stuff)
        {
            return{
                message : 'Stuff updated successfully',
                stuff: _stuff
            };
        } 
        
        return {
            message: 'Stuff not found!!',
        };     
    }

    async deleteStuff(stuffId) 
    {
        const _stuff = await this.Stuff.findByIdAndDelete(stuffId);

        if(_stuff)
        {
            const _user = await this.User.findOne({stuffs : stuffId});

            if(_user)
            {
                _user.stuffs.pull(stuffId);
               
            } 
    
            return{
                message : 'Stuff deleted successfully'
            };
        } 
        
        return {
            message: 'stuff not found!!'
        };       
    }
}

module.exports = StuffService;