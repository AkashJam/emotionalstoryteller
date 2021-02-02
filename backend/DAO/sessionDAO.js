const { from } = require('../DB/connection');
const database = require('../DB/connection');

module.exports = {
    sessionNotExists: async (id) => {
        try {
            await database.select().where('session_id',id).from('session').then(function(data) {
                // console.log(data[0])
                // Sometimes returns [] when no session exits
                if(data[0]==undefined){
                    notexists=true
                }
                else{
                    notexists=false
                }
            })
        } catch (error) {
            notexists=true
            // console.log('err')
        }
        return notexists
    },

    createSession: async (id) => {
        await database.insert({session_id: id, user_responses: 'none', sections: 'none', conclusion_no: 0}).into('session').then(function(data) {
            //console.log(data)
        })
    },

    selectSession: async (id) => {
        try {
            await database.select().where('session_id',id).from('session').then(function(data) {
                result = data[0]
                resp = result.user_responses
                sect = result.sections
                conc = result.conclusion_no
            })
        } catch (error) {
            resp = 'none'
            sect = 'none'
            conc = 0
            // console.log(error)
        }      
        // console.log(res)
        return {responses: resp,
            sections: sect,
            conclusion_no: conc
        }
    },

    updateSessionResponses: async (id,reply) => {
        await database('session').where({ session_id: id }).update({ user_responses: reply }).then(function(data) {
            // console.log(data)
        })
    },
    
    updateSessionSections: async (id,section) => {
        await database('session').where({ session_id: id }).update({ sections: section }).then(function(data) {
            // console.log(data)
        })
    },

    updateSessionConclusions: async (id,number) => {
        await database('session').where({ session_id: id }).update({ conclusion_no: number }).then(function(data) {
            // console.log(data)
        })
    },
};