import { Language } from '../../../../common/language'

export let option = {
  tooltip: {
    position: 'right',
    borderColor: '#333',
    formatter: (args: any) => {
      if (args.data) {
        let data = args.data.data
        if (data) {
          let str = '<div style="min-width:150px;">'

          if (Number.isFinite(data.Volume)) {
            str += `<div style="display:flex;justify-content: space-between;"><div>桶容量</div><div>${data.Volume}</div></div>`
          }
          if (Number.isFinite(data.Confidence)) {
            str += `<div style="display:flex;justify-content: space-between;"><div>置信度</div><div>${data.Confidence}</div></div>`
          }
          if (data.SourceFrom) {
            str += `<div style="display:flex;justify-content: space-between;"><div>数据来源 </div>&nbsp;&nbsp;<div>${data.SourceFrom}</div></div>`
          }
          if (data.CoverState) {
            str += `<div style="display:flex;justify-content: space-between;"><div>桶盖</div><div>${Language.CoverState(
              data.CoverState
            )}</div></div>`
          }
          if (data.Id) {
            str += `<div style="display:flex;justify-content: space-between;"><div>编号</div><div>${data.Id}</div></div>`
          }
          if (data.Name) {
            str += `<div style="display:flex;justify-content: space-between;"><div>名称</div><div>${data.Name}</div></div>`
          }
          if (data.Position) {
            str += `<div style="display:flex;justify-content: space-between;"><div>坐标</div><div>(${data.Position.X},&nbsp;${data.Position.Y})</div></div>`
          }
          if (data.Rfid) {
            str += `<div style="display:flex;justify-content: space-between;"><div>RFID</div><div>${data.Rfid}</div></div>`
          }
          if (data.NodeType) {
            str += `<div style="display:flex;justify-content: space-between;"><div>节点类型</div><div>${Language.MeshNodeType(
              data.NodeType
            )}</div></div>`
          }
          if (data.CanType) {
            str += `<div style="display:flex;justify-content: space-between;"><div>类型</div><div>${Language.CanType(
              data.CanType
            )}</div></div>`
          }
          if (Number.isFinite(data.Distance)) {
            str += `<div style="display:flex;justify-content: space-between;"><div>距离</div><div>${data.Distance}cm</div></div>`
          }
          str += '</div>'
          return str
        }
      }
      return ''
    },
  },
  series: [
    {
      type: 'graph',
      layout: 'none',
      symbolSize: 30,
      roam: false,
      emphasis: {
        scale: false,
      },
      markPoint: {
        symbolSize: 20,
        data: [],
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
        },
        {
          source: 'Node 2',
          target: 'Node 1',
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
