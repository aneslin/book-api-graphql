const {User, Book} = require('../models')
const { signToken } = require("../utils/auth")


const resolvers = {
    Query:{

        users: async () => {
            return User.find()
            .populate("Book")
        }
    }
}



module.exports = resolvers