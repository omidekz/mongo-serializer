interface ModelObject{
    obj: object
}
interface Model{
    schema: ModelObject,
    
}
class Serializer{
    static extend(Model: Model, fields: string[]){
        class dynamic{
            all_fields: Array<String>
            select_fields: Array<String>
            result: object 
            constructor(model_instance, many: Boolean = false){
                this.all_fields = Object.keys(Model.schema.obj)
                for (let i = 0 ; i < fields.length ; i++){
                    if (
                        !this.all_fields.indexOf(fields[i]) &&
                        typeof(this[fields[i]]) != 'function'
                    ){
                        throw new Error(fields[i]+" object | class have not this field | method")
                    }
                }
                this.select_fields = fields
                this.init(async () =>{
                    model_instance = await model_instance
                    
                    return model_instance
                })
            }
            init(callback){
                callback.bind(this)()
            }
        }
        return dynamic
    }
}

export {Serializer}