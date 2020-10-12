interface ModelObject{
    obj: object
}
interface BaseModel{
    schema: ModelObject,
    
}
class Serializer{
    static extend(Model: BaseModel, fields: string[]){
        class dynamic{
            all_fields: Array<string>
            select_fields: string[]
            result: object | object[]
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
                    if (many){
                        this.result = []
                        if (Array.isArray(this.result))
                        for await (const doc of model_instance){
                            this.result.push(this.handle_document(doc))
                        }
                    }else{
                        this.result = this.handle_document(model_instance)
                    }
                    return model_instance
                })
            }
            private async handle_document(pure_doc){
                this['name']
                let result_object: object = {

                }
                let select_fields = this.select_fields
                for (let i = 0 ; i < select_fields.length ; i++){
                    if (typeof(this[select_fields[i]]) == "function"){
                        result_object[select_fields[i]] = await (
                            this[select_fields[i]].bind(this)(pure_doc)
                        )
                    }else{
                        result_object[select_fields[i]] = pure_doc[
                            select_fields[i]
                        ]
                    }
                }
                return result_object
            }
            init(callback){
                callback.bind(this)()
            }
        }
        return dynamic
    }
}

export {Serializer}