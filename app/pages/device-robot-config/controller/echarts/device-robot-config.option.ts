export let option = {
  tooltip: {},
  // xAxis: {
  //   type: 'value',
  //   show: true,
  //   minInterval: 1,
  // },
  // yAxis: {
  //   type: 'value',
  //   show: true,
  //   minInterval: 1,
  // },
  series: [
    {
      type: 'graph',
      layout: 'none',
      // coordinateSystem: 'cartesian2d',
      symbolSize: 30,
      zIndex: 0,
      roam: true,
      edgeSymbol: ['circle', 'circle'],
      edgeSymbolSize: [0, 0],
      edgeLabel: {
        fontSize: 20,
      },
      tooltip: {
        position: [30, 30],
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
        width: 4,
        curveness: 0,
      },
      selectedMode: 'single',
      select: {
        itemStyle: {
          borderColor: '#000',
          borderWidth: 2,
        },
      },
    },
  ],
}
