export let itemStyle = {
  MagneticPin: {
    itemStyle: {
      color: '#b1d4ff',
      borderColor: '#7e7e7e',
      borderWidth: 2,
    },
  },
  DropPort: {
    symbol: 'rect',
    itemStyle: {
      color: '#ffeec4',
      borderColor: '#7e7e7e',
      borderWidth: 2,
    },
  },
  StorePort: {
    symbol: 'rect',
    itemStyle: {
      color: '#d9ffff',
      borderColor: '#7e7e7e',
      borderWidth: 2,
    },
  },
  ChargingPort: {
    symbol: 'rect',
    itemStyle: {
      color: '#cfffd3',
      borderColor: '#7e7e7e',
      borderWidth: 2,
    },
  },
}

export let option = {
  title: {
    text: '智能桶车',
  },
  tooltip: {},
  series: [
    {
      type: 'graph',
      layout: 'none',
      symbolSize: 30,
      roam: true,
      label: {
        position: 'bottom',
      },
      edgeLabel: {
        fontSize: 20,
      },
      data: [
        {
          name: '',
          x: 0,
          y: 0,
          zlevel: 0,
          symbol: 'rect',
        },
        {
          name: 'Node 1',
          x: 300,
          y: 300,
        },
        {
          name: 'Node 2',
          x: 800,
          y: 300,
        },
        {
          name: 'Node 3',
          x: 550,
          y: 100,
        },
        {
          name: 'Node 4',
          x: 550,
          y: 500,
        },
      ],
      // links: [],
      links: [
        {
          source: 1,
          target: 2,
          label: {
            show: true,
            formatter: () => {
              return '11111'
            },
          },
        },
        {
          source: 'Node 2',
          target: 'Node 1',
          label: {
            show: true,
          },
          lineStyle: {
            curveness: 0.2,
          },
        },
        {
          source: 'Node 1',
          target: 'Node 3',
        },
        {
          source: 'Node 2',
          target: 'Node 3',
        },
        {
          source: 'Node 2',
          target: 'Node 4',
        },
        {
          source: 'Node 1',
          target: 'Node 4',
        },
      ],
      lineStyle: {
        opacity: 0.9,
        width: 2,
        curveness: 0,
      },
    },
  ],
}
