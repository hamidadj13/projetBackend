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
            message: 'Stuff created successfully !!',
            stuff: _stuff
        };
        
    }

    async updateStuff(stuffId, stuffData) 
    {
        const _stuff = await this.Stuff.findByIdAndUpdate(stuffId, stuffData, {new: true});

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

    async listAllStuffs({page = 1, limit = 10, search = ''}) 
    {
        let query = {};

        if (search) {
            query = {
                $or:[
                    {title: { $regex: search, $options: '1' } },
                    {description: { $regex: search, $options: '1' } },
                    {role: { $regex: search, $options: '1' } }
                ],
            };
        };
        const _stuffs = await this.Stuff.find(query)
                                       .limit(limit)
                                       .skip((page - 1) * limit);

        const _total = await this.Stuff.countDocuments();

        return {
            message : 'List of all stuffs !!',
            stuffs: _stuffs,
            total: _total,
            totalPages: Math.ceil(_total / limit),
            currentPage: page,
            limit: limit
        };
    }
}

module.exports = StuffService;