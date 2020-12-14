const db = require('../../database/connection')

module.exports = {
    find(){
        return db('users').select('id', 'username', 'password').orderBy('id')
    },
    findById(id){
        return db('users').where({ id }).first()
    },
    async add(user){
        const [id] = await db('users').insert(user, 'id')
        return this.findById(id)
    }
}

