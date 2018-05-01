//
//
//
class List {
    constructor(){
        this.list = []
    }

    getAll() {
        return this.list
    }

    /**
     * Add only unique values. 
     * 
     * @param {*} value The value to add. 
     * @param {*} callback (err, result) : err when duplicate, result when noduplicate found.
     */
    add(value, callback){

        /**
         * Add only unique values. We want to check wether the value to add already
         * exists in the list. We also want to abort further looping when a duplicate 
         * has been found. Otherwise we would always loop the entire list, even when 
         * a duplicate has already been found.
         * Since the first item must always be pushed onto the empty list, use do/while.
         */
        let uniqueItems = this.list.filter(function(elem) {
            // console.log(i, elem)
            return elem.email === value.email
        })
        // console.log(uniqueItems)
        if(uniqueItems.length === 0) {
            this.list.push(value)
            callback(null, true)
        } else {
            callback('Duplicate item found for ' + value.email, null)
        }
    }

    getByProperty(prop, callback){

    }
    
}

module.exports = List