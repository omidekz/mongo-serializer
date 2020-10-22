# Mongo Model Serializer(mongoose driver)

## Description

  ```Serializer``` class has ```extend(Model, fields)``` method.
    
  for tell to serializer select all fields just pass ```['*']``` as ```fields``` param

  for tell to serializer selec all fields + some extera methods pass ```['*', 'method_name']``` as ```fields``` param

  methods must create in below format

  ```js  
  // _field is required
  methodname_field(obj){ // obj is an instance of you'r Model
      // method body
      // return field value
  }
  ```

## Usage

- we have some models

```js
// models.js
const mongoose = require('mongoose')

const BasicSchema = new mongoose.Schema({
    avatar: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    gender: {
        type: mongoose.Schema.Types.String,
        enum: ['fem', 'mal', 'oth', 'pnts']
    },
    lastUpdate: {
        in: {
            type: mongoose.Schema.Types.Date,
            default: Date.now
        }
    }
})

exports.BasicModel = mongoose.model("BasicModel", BasicSchema)
```

- make serializer

```js
// serializers.js
const models = require('./models')
const serializer = require('mongo-serializer').Serializer

class BasicModel extends serializer.extend(
    models.BasicModel, [
        'avatar', 'lastUpdate', 'age' // age was not in Model Schema
    ]
){
    avatar_field(obj){
        return obj.avatar?obj.avatar:'default.png'
    }

    age_field(obj){ // obj is my BasicModel instace
        return Math.floor(Math.random()*10+10) // return value of age_field
    }

}
exports.BasicModelSerializer = BasicModel
```

- in controllers

```js
// controllers.js
const serializers = require('./serializers')
const models = require('./models')

exports.basic_api = async (req, res) => {
    // handle validations
    let basics_thing_set = models.BasicModel.find().exec()
    return res.status(200).json({
        basic_set: await serializers.BasicModelSerializer(
            basics_thing_set, many=true // pass many=true if input is array else many=false by default
        ).to_json()
    })
}
```
