
exports.message = function(topicId, userId, content) {

    return {

        "type": "Content",
        "topic": topicId,
        "member": userId,
        "content": content,
        "date": new Date().getMilliseconds()

    };

};

exports.topic = function(topicId) {

    return {

        "type": "Topic",
        "topic": topicId,
        "members": {}

    };

};

exports.connection = function(topicId, userId) {

    return {

        "type": "Connection",
        "topic": topicId,
        "member": userId

    };

};

exports.disconnection = function(topicId, userId) {

    return {

        "type": "Disconnection",
        "topic": topic,
        "member": userId

    };

};