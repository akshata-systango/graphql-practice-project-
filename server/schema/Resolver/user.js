const { default: axios } = require("axios");

const resolvers = {
    Query: {
        users: async () => {
            return axios.get('http://localhost:4000/users').then(response => response.data)
        },
        messages: async () => {
            return axios.get(`http://localhost:4000/message`).then(response => response.data)
        }
    },

    Mutation: {
        createUser: async (parent, args) => {
            return axios.post(`http://localhost:4000/users`, {
                id: args.id,
                firstname: args.firstname,
                lastname: args.lastname,
                age: args.age,
                email: args.email
            })
        },

        deleteUser: async(parent, args) => {
            return axios.delete(`http://localhost:4000/users/${args.id}`)
            .then(response => response.data)
        },

        editUser: async(parent, args) => {
                return axios.put(`http://localhost:4000/users/${args.id}`,
                    {
                        id: args.id,
                        firstname: args.firstname,
                        lastname: args.lastname,
                        age: args.age,
                        email: args.email
                    })
                    .then(response => response.data)
            },

        sendMessage: async(parent, args) => {
            console.log(args, 'args')
            return axios.put(`http://localhost:4000/user/${args.userId}/message`, {
                id:args.id,
                username:args.username,
                message:args.message
            }).then(response => console.log(response.data, 'responsesss'))
        }
        },

        subscription: {
            newMessage: {
                subscribe: () => pubsub.asyncIterator('newMessage')
            }
        }
    };

module.exports = { resolvers }
