interface ModelObject{
    obj: object
}
interface BaseModel<T>{
    schema: ModelObject & T,
    
}
class Serializer{
    static extend<T>(Model: BaseModel<T> & T, fields: string[]): object{
        class dynamic{
            all_fields: Array<string>
            select_fields: string[]
            result: object | object[]
            many: boolean = false
            model_instance: object | object[]
            constructor(model_instance, many: boolean = false){
                this.all_fields = Object.keys(Model.schema.obj)
                if (fields[0] == 'all'){
                    fields = this.all_fields
                }
                this.model_instance = model_instance
                this.many = many
                this.select_fields = fields
            }
            private async handle_document(pure_doc){
                let result_object: object = {

                }
                let select_fields = this.select_fields
                for (let i = 0 ; i < select_fields.length ; i++){
                    if (typeof(this[select_fields[i]+"_field"]) == "function"){
                        result_object[select_fields[i]] = await (
                            this[select_fields[i]] = this[select_fields[i]+"_field"].bind(this)(pure_doc)
                        )
                    }else{
                        result_object[select_fields[i]] = pure_doc[
                            select_fields[i]
                        ]
                    }
                }
                return result_object
            }
            async to_json(){
                this.model_instance = await this.model_instance
                fields = this.select_fields
                
                for (let i = 0 ; i < fields.length ; i++){
                    if (
                        !this.all_fields.indexOf(fields[i]) &&
                        typeof(this[fields[i]+"_field"]) != 'function'
                    ){
                        throw new Error(fields[i]+" object | class have not this field | method")
                    }
                }
                if (this.many){
                    this.result = []
                }
                if (this.many && Array.isArray(this.result) && Array.isArray(this.model_instance)){
                        for (const doc of this.model_instance){
                            this.result.push(await this.handle_document(doc))
                        }
                    }else{
                        this.result = this.handle_document(await this.model_instance)
                    }
                return this.result
            }
        }
        return dynamic
    }
}

export {Serializer}