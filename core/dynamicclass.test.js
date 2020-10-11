function dct (m, fs){
    class dynamic {
        constructor(){
            console.log('hi');
            this.model = m
            this.fields = fs
        }
    }
    return dynamic
}

TestModel = {
    obj: {
        schema: {
            name: "string",
            age: "number",
            family: "string"
        }
    }
}

class A extends dct(TestModel, ['name', 'age']){

}

a = new A()

console.log(a.model);
