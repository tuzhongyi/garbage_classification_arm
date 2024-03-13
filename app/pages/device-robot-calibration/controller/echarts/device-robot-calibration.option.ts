export let option = {
  series: [
    {
      zlevel: 0,
      type: 'graph',
      layout: 'none',
      symbolSize: 30,
      roam: true,
      edgeSymbol: ['circle', 'circle'],
      edgeSymbolSize: [0, 0],
      edgeLabel: {
        fontSize: 20,
      },
      tooltip: {
        position: [30, 30],
      },
      data: [],
      links: [],
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
    {
      zlevel: 1,
      type: 'graph',
      layout: 'none',
      symbolSize: 0,
      roam: true,
      emphasis: {
        scale: false,
      },
      animation: true,
      data: [],
      selectedMode: false,
    },
  ],
}
