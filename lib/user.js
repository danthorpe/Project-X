
exports = module.exports = User;

function User(client) {

    this.client = client;


};

User.prototype.write = function(data) {

    this.client.send(data);

};