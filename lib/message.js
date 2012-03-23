
exports.message = function(topic, user, content) {

    return {

        "topic": topic.id,
        "member": user.id,
        "content": content,
        "date": new Date().getMilliseconds()

    };

};

exports.topic = function(topic, members) {

    return {

        "topic": topic.id,
        "members": members || {}

    };

};

exports.connection = function(topic, user) {

    return {

        "topic": topic.id,
        "member": user.id

    };

};

exports.disconnection = function(topic, user) {

    return {

        "topic": topic.id,
        "member": user.id

    };

};