const str = `[
         {
           "diff": 0,
           "key": "common",
           "value": [
             {
               "diff": 1,
               "key": "follow",
               "value": false
             },
             {
               "diff": 0,
               "key": "setting1",
               "value": "Value 1"
             },
             {
               "diff": -1,
               "key": "setting2",
               "value": 200
             },
             {
               "diff": -1,
               "key": "setting3",
               "value": true
             },
             {
               "diff": 1,
               "key": "setting3",
               "value": [
                 {
                   "diff": 0,
                   "key": "key",
                   "value": "value"
                 }
               ]
             },
             {
               "diff": 1,
               "key": "setting4",
               "value": "blah blah"
             },
             {
               "diff": 1,
               "key": "setting5",
               "value": [
                 {
                   "diff": 0,
                   "key": "key5",
                   "value": "value5"
                 }
               ]
             },
             {
               "diff": 0,
               "key": "setting6",
               "value": [
                 {
                   "diff": 0,
                   "key": "doge",
                   "value": [
                     {
                       "diff": -1,
                       "key": "wow",
                       "value": "too much"
                     },
                     {
                       "diff": 1,
                       "key": "wow",
                       "value": "so much"
                     }
                   ]
                 },
                 {
                   "diff": 0,
                   "key": "key",
                   "value": "value"
                 },
                 {
                   "diff": 1,
                   "key": "ops",
                   "value": "vops"
                 }
               ]
             }
           ]
         },
         {
           "diff": 0,
           "key": "group1",
           "value": [
             {
               "diff": -1,
               "key": "baz",
               "value": "bas"
             },
             {
               "diff": 1,
               "key": "baz",
               "value": "bars"
             },
             {
               "diff": 0,
               "key": "foo",
               "value": "bar"
             },
             {
               "diff": -1,
               "key": "nest",
               "value": [
                 {
                   "diff": 0,
                   "key": "key",
                   "value": "value"
                 }
               ]
             },
             {
               "diff": 1,
               "key": "nest",
               "value": "str"
             }
           ]
         },
         {
           "diff": -1,
           "key": "group2",
           "value": [
             {
               "diff": 0,
               "key": "abc",
               "value": 12345
             },
             {
               "diff": 0,
               "key": "deep",
               "value": [
                 {
                   "diff": 0,
                   "key": "id",
                   "value": 45
                 }
               ]
             }
           ]
         },
         {
           "diff": 1,
           "key": "group3",
           "value": [
             {
               "diff": 0,
               "key": "deep",
               "value": [
                 {
                   "diff": 0,
                   "key": "id",
                   "value": [
                     {
                       "diff": 0,
                       "key": "number",
                       "value": 45
                     }
                   ]
                 }
               ]
             },
             {
               "diff": 0,
               "key": "fee",
               "value": 100500
             }
           ]
         },
         {
           "diff": 0,
           "key": "group4",
           "value": [
             {
               "diff": -1,
               "key": "default",
               "value": null
             },
             {
               "diff": 1,
               "key": "default",
               "value": ""
             },
             {
               "diff": -1,
               "key": "foo",
               "value": 0
             },
             {
               "diff": 1,
               "key": "foo",
               "value": null
             },
             {
               "diff": -1,
               "key": "isNested",
               "value": false
             },
             {
               "diff": 1,
               "key": "isNested",
               "value": "none"
             },
             {
               "diff": 1,
               "key": "key",
               "value": false
             },
             {
               "diff": 0,
               "key": "nest",
               "value": [
                 {
                   "diff": -1,
                   "key": "bar",
                   "value": ""
                 },
                 {
                   "diff": 1,
                   "key": "bar",
                   "value": 0
                 },
                 {
                   "diff": -1,
                   "key": "isNested",
                   "value": true
                 }
               ]
             },
             {
               "diff": 1,
               "key": "someKey",
               "value": true
             },
             {
               "diff": -1,
               "key": "type",
               "value": "bas"
             },
             {
               "diff": 1,
               "key": "type",
               "value": "bar"
             }
           ]
         }
       ]`;

export default JSON.parse(str);
