const obj1 = {
  common: {
    setting1: 'Value 1',
    setting2: 200,
    setting3: true,
    setting6: {
      key: 'value',
      doge: {
        wow: '',
      },
    },
  },
  group1: {
    baz: 'bas',
    foo: 'bar',
    nest: {
      key: 'value',
    },
  },
  group2: {
    abc: 12345,
    deep: {
      id: 45,
    },
  },
};

const obj2 = {
  common: {
    follow: false,
    setting1: 'Value 1',
    setting3: null,
    setting4: 'blah blah',
    setting5: {
      key5: 'value5',
    },
    setting6: {
      key: 'value',
      ops: 'vops',
      doge: {
        wow: 'so much',
      },
    },
  },
  group1: {
    foo: 'bar',
    baz: 'bars',
    nest: 'str',
  },
  group3: {
    deep: {
      id: {
        number: 45,
      },
    },
    fee: 100500,
  },
};

const diffObj = [
  {
    diff: 0,
    key: 'common',
    value: [
      {
        diff: 1,
        key: 'follow',
        value: false,
      },
      {
        diff: 0,
        key: 'setting1',
        value: 'Value 1',
      },
      {
        diff: -1,
        key: 'setting2',
        value: 200,
      },
      {
        diff: -1,
        key: 'setting3',
        value: true,
      },
      {
        diff: 1,
        key: 'setting3',
        value: null,
      },
      {
        diff: 1,
        key: 'setting4',
        value: 'blah blah',
      },
      {
        diff: 1,
        key: 'setting5',
        value: [
          {
            diff: 0,
            key: 'key5',
            value: 'value5',
          },
        ],
      },
      {
        diff: 0,
        key: 'setting6',
        value: [
          {
            diff: 0,
            key: 'doge',
            value: [
              {
                diff: -1,
                key: 'wow',
                value: '',
              },
              {
                diff: 1,
                key: 'wow',
                value: 'so much',
              },
            ],
          },
          {
            diff: 0,
            key: 'key',
            value: 'value',
          },
          {
            diff: 1,
            key: 'ops',
            value: 'vops',
          },
        ],
      },
    ],
  },
  {
    diff: 0,
    key: 'group1',
    value: [
      {
        diff: -1,
        key: 'baz',
        value: 'bas',
      },
      {
        diff: 1,
        key: 'baz',
        value: 'bars',
      },
      {
        diff: 0,
        key: 'foo',
        value: 'bar',
      },
      {
        diff: -1,
        key: 'nest',
        value: [
          {
            diff: 0,
            key: 'key',
            value: 'value',
          },
        ],
      },
      {
        diff: 1,
        key: 'nest',
        value: 'str',
      },
    ],
  },
  {
    diff: -1,
    key: 'group2',
    value: [
      {
        diff: 0,
        key: 'abc',
        value: 12345,
      },
      {
        diff: 0,
        key: 'deep',
        value: [
          {
            diff: 0,
            key: 'id',
            value: 45,
          },
        ],
      },
    ],
  },
  {
    diff: 1,
    key: 'group3',
    value: [
      {
        diff: 0,
        key: 'deep',
        value: [
          {
            diff: 0,
            key: 'id',
            value: [
              {
                diff: 0,
                key: 'number',
                value: 45,
              },
            ],
          },
        ],
      },
      {
        diff: 0,
        key: 'fee',
        value: 100500,
      },
    ],
  },
];

const diffStr = `{
  common: {
    + follow: false
      setting1: Value 1
    - setting2: 200
    - setting3: true
    + setting3: null
    + setting4: blah blah
    + setting5: {
          key5: value5
      }
      setting6: {
          doge: {
            - wow: 
            + wow: so much
          }
          key: value
        + ops: vops
      }
  }
  group1: {
    - baz: bas
    + baz: bars
      foo: bar
    - nest: {
          key: value
      }
    + nest: str
  }
- group2: {
      abc: 12345
      deep: {
          id: 45
      }
  }
+ group3: {
      deep: {
          id: {
              number: 45
          }
      }
      fee: 100500
  }
}`;

export {
  diffObj, diffStr, obj1, obj2,
};
