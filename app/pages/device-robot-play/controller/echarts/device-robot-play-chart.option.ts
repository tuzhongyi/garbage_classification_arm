import { Language } from '../../../../common/language'

function formatter(title: string, value: string) {
  return `<div style="display:flex;justify-content: space-between;"><div>${title}</div><div>${value}</div></div>`
}

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
            str += formatter('桶容量', data.Volume)
          }
          if (Number.isFinite(data.Confidence)) {
            str += formatter('置信度', data.Confidence)
          }
          if (data.SourceFrom) {
            str += formatter('数据来源&nbsp;', data.SourceFrom)
          }
          if (data.CoverState) {
            str += formatter('桶盖', Language.CoverState(data.CoverState))
          }
          if (data.Id) {
            str += formatter('编号', data.Id)
          }
          if (data.Name) {
            str += formatter('名称', data.Name)
          }
          if (data.Position) {
            str += formatter(
              '坐标',
              `(${data.Position.X},&nbsp;${data.Position.Y})`
            )
          }
          if (data.Rfid) {
            str += formatter('RFID', data.Rfid)
          }
          if (data.NodeType) {
            str += formatter('节点类型', Language.MeshNodeType(data.NodeType))
          }
          if (data.CanType) {
            str += formatter('类型', Language.CanType(data.CanType))
          }
          if (Number.isFinite(data.Distance)) {
            str += formatter('距离', data.Distance)
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
      roam: true,
      emphasis: {
        scale: false,
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
      zlevel: 0,
    },
    {
      type: 'graph',
      layout: 'none',
      symbolSize: 0,
      roam: true,
      emphasis: {
        scale: false,
      },
      animation: false,
      data: [],
      selectedMode: false,
      zlevel: 1,
    },
  ],
}
