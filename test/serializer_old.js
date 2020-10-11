exports.Serializer = {
    extend: (model, fields) => {
        class dynamicClass {
            constructor(obj){
                this.model = model
                this.fields = fields
                this.mainfieldsname = Object.keys(
                    model.obj.schema
                )
                this.json = {}
                for (let i=0; i < fields.length; i++){
                    if (!this.mainfieldsname.includes(fields[i])){
                        throw new Error("obj is not contain "+fields[i]+" prperty")
                    }
                    this.json[fields[i]] = obj[fields[i]]
                }
            }
        }
        return dynamicClass
    }
}
