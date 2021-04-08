export default [
  {
    key: 'common',
    data: {
      type: 'nested',
      children: [
        {
          key: 'follow',
          addedData: {
            type: 'simple',
            value: false,
          },
        },
        {
          key: 'setting1',
          data: {
            type: 'simple',
            value: 'Value 1',
          },
        },
        {
          key: 'setting2',
          removedData: {
            type: 'simple',
            value: 200,
          },
        },
        {
          key: 'setting3',
          removedData: {
            type: 'simple',
            value: true,
          },
          addedData: {
            type: 'simple',
            value: null,
          },
        },
        {
          key: 'setting4',
          addedData: {
            type: 'simple',
            value: 'blah blah',
          },
        },
        {
          key: 'setting5',
          addedData: {
            type: 'nested',
            children: [
              {
                key: 'key5',
                data: {
                  type: 'simple',
                  value: 'value5',
                },
              },
            ],
          },
        },
        {
          key: 'setting6',
          data: {
            type: 'nested',
            children: [
              {
                key: 'doge',
                data: {
                  type: 'nested',
                  children: [
                    {
                      key: 'wow',
                      removedData: {
                        type: 'simple',
                        value: '',
                      },
                      addedData: {
                        type: 'simple',
                        value: 'so much',
                      },
                    },
                  ],
                },
              },
              {
                key: 'key',
                data: {
                  type: 'simple',
                  value: 'value',
                },
              },
              {
                key: 'ops',
                addedData: {
                  type: 'simple',
                  value: 'vops',
                },
              },
            ],
          },
        },
      ],
    },
  },
  {
    key: 'group1',
    data: {
      type: 'nested',
      children: [
        {
          key: 'baz',
          removedData: {
            type: 'simple',
            value: 'bas',
          },
          addedData: {
            type: 'simple',
            value: 'bars',
          },
        },
        {
          key: 'foo',
          data: {
            type: 'simple',
            value: 'bar',
          },
        },
        {
          key: 'nest',
          removedData: {
            type: 'nested',
            children: [
              {
                key: 'key',
                data: {
                  type: 'simple',
                  value: 'value',
                },
              },
            ],
          },
          addedData: {
            type: 'simple',
            value: 'str',
          },
        },
      ],
    },
  },
  {
    key: 'group2',
    removedData: {
      type: 'nested',
      children: [
        {
          key: 'abc',
          data: {
            type: 'simple',
            value: 12345,
          },
        },
        {
          key: 'deep',
          data: {
            type: 'nested',
            children: [
              {
                key: 'id',
                data: {
                  type: 'simple',
                  value: 45,
                },
              },
            ],
          },
        },
      ],
    },
  },
  {
    key: 'group3',
    addedData: {
      type: 'nested',
      children: [
        {
          key: 'deep',
          data: {
            type: 'nested',
            children: [
              {
                key: 'id',
                data: {
                  type: 'nested',
                  children: [
                    {
                      key: 'number',
                      data: {
                        type: 'simple',
                        value: 45,
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
        {
          key: 'fee',
          data: {
            type: 'simple',
            value: 100500,
          },
        },
      ],
    },
  },
];
