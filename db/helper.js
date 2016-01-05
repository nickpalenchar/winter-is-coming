
var findOrCreate = function(query){
    var Model = this;

    return this.findOne(query)
        .then(function(user){
            if(user === null) return Model.create(query);
            return user;
        });
}

module.exports = findOrCreate;