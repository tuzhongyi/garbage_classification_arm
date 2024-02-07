class CanvasDrawColor {
  stroke = {
    normal: '#0f0',
    drawing: '#ffff7d',
    selected: '#ff3232',
  }
  fill = {
    normal: 'rgba(0,150,0,0.3)',
    drawing: 'rgba(255,255,125,0.3)',
    selected: 'rgba(180,40,40,0.3)',
  }
}

export class ColorTool {
  static canvas = new CanvasDrawColor()
}
