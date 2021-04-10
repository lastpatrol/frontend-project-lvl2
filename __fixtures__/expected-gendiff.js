export default [
  {
    key: 'common',
    type: 'unchanged',
    children: [
      {
        key: 'follow',
        type: 'added',
        value: false,
      },
      {
        key: 'setting1',
        type: 'unchanged',
        value: 'Value 1',
      },
      {
        key: 'setting2',
        type: 'removed',
        value: 200,
      },
      {
        key: 'setting3',
        type: 'toSimple',
        removedValue: true,
        addedValue: null,
      },
      {
        key: 'setting4',
        type: 'added',
        value: 'blah blah',
      },
      {
        key: 'setting5',
        type: 'added',
        children: [
          {
            key: 'key5',
            type: 'unchanged',
            value: 'value5',
          },
        ],
      },
      {
        key: 'setting6',
        type: 'unchanged',
        children: [
          {
            key: 'doge',
            type: 'unchanged',
            children: [
              {
                key: 'wow',
                type: 'toSimple',
                removedValue: '',
                addedValue: 'so much',
              },
            ],
          },
          {
            key: 'key',
            type: 'unchanged',
            value: 'value',
          },
          {
            key: 'ops',
            type: 'added',
            value: 'vops',
          },
        ],
      },
    ],
  },
  {
    key: 'group1',
    type: 'unchanged',
    children: [
      {
        key: 'baz',
        type: 'toSimple',
        removedValue: 'bas',
        addedValue: 'bars',
      },
      {
        key: 'foo',
        type: 'unchanged',
        value: 'bar',
      },
      {
        key: 'nest',
        type: 'toSimple',
        children: [
          {
            key: 'key',
            type: 'unchanged',
            value: 'value',
          },
        ],
        value: 'str',
      },
    ],
  },
  {
    key: 'group2',
    type: 'removed',
    children: [
      {
        key: 'abc',
        type: 'unchanged',
        value: 12345,
      },
      {
        key: 'deep',
        type: 'unchanged',
        children: [
          {
            key: 'id',
            type: 'unchanged',
            value: 45,
          },
        ],
      },
    ],
  },
  {
    key: 'group3',
    type: 'added',
    children: [
      {
        key: 'deep',
        type: 'unchanged',
        children: [
          {
            key: 'id',
            type: 'unchanged',
            children: [
              {
                key: 'number',
                type: 'unchanged',
                value: 45,
              },
            ],
          },
        ],
      },
      {
        key: 'fee',
        type: 'unchanged',
        value: 100500,
      },
    ],
  },
];
