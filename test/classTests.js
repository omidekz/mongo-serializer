const bss = require('./../serializer').Serializer

class A extends bss.extend({schema: {obj: {}}}, ['status', 'Shop']){
    constructor(model_instance){
        super(model_instance)
    }
    status(obj) {
        
    }

    Shop(obj){
        
    }
}

new A({})