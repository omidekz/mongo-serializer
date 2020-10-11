const jss = require('./core')

const TestModel = {
    obj: {
        schema: {
            name: 'String',
            family: 'String',
            age: 'number'
        }
    }
}

class TestSerializer extends jss.Serializer.extend(TestModel, ['name', 'age']) {
    
}

class A{
    static name = 'ali'
}

return new TestSerializer(TestModel.find({}))

console.log(tss + "");
