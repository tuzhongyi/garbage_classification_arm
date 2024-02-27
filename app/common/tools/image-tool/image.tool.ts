import '../../../../assets/images/robot/can-type/Dry.png'
import '../../../../assets/images/robot/can-type/Hazard.png'
import '../../../../assets/images/robot/can-type/Recycle.png'
import '../../../../assets/images/robot/can-type/Wet.png'

class TrashCanImage {
  [key: string]: string
  readonly Dry = '../../../../assets/images/robot/can-type/Dry.png'

  readonly Wet = '../../../../assets/images/robot/can-type/Wet.png'
  readonly Recycle = '../../../../assets/images/robot/can-type/Recycle.png'
  readonly Hazard = '../../../../assets/images/robot/can-type/Hazard.png'
}

const RobotImage =
  'path://M157.019,200.002 L143.117,200.002 C134.346,200.002 127.085,193.606 125.686,185.224 L125.410,185.224 L125.410,147.267 C125.410,142.026 129.654,137.777 134.889,137.777 L143.117,137.777 L157.019,137.777 L157.639,137.777 L157.639,137.809 C167.121,138.138 174.713,145.917 174.713,155.491 L174.713,182.288 C174.713,192.071 166.791,200.002 157.019,200.002 ZM114.035,147.267 L114.035,185.224 L60.953,185.224 L60.953,147.267 C60.953,135.740 51.626,126.390 40.100,126.390 L19.246,126.390 L19.246,103.616 L74.856,103.616 L74.856,70.910 L100.133,70.910 L100.133,103.616 L157.639,103.616 L157.639,126.390 L134.889,126.390 C123.388,126.390 114.035,135.740 114.035,147.267 ZM23.303,0.499 L153.594,0.499 L153.594,59.333 L23.303,59.333 L23.303,0.499 ZM114.705,41.050 C122.226,41.279 128.509,35.362 128.738,27.832 C128.967,20.303 123.056,14.014 115.535,13.784 C115.259,13.776 114.982,13.776 114.705,13.784 C107.184,14.014 101.273,20.303 101.502,27.832 C101.721,35.039 107.506,40.830 114.705,41.050 ZM48.568,28.254 C48.797,35.783 55.079,41.701 62.601,41.472 C70.122,41.242 76.033,34.953 75.804,27.423 C75.584,20.216 69.800,14.425 62.601,14.206 C55.079,13.976 48.797,19.894 48.568,27.423 C48.559,27.700 48.559,27.977 48.568,28.254 ZM19.246,137.777 L40.100,137.777 C45.335,137.777 49.579,142.026 49.579,147.267 L49.579,155.491 L49.579,182.288 L49.579,185.224 L49.316,185.224 C47.916,193.606 40.656,200.002 31.885,200.002 L31.885,200.002 L17.982,200.002 C8.210,200.002 0.288,192.071 0.288,182.289 C0.288,182.288 0.288,182.288 0.288,182.288 L0.288,155.491 C0.288,145.708 8.210,137.777 17.982,137.777 L19.246,137.777 L19.246,137.777 Z'

export class ImageTool {
  static trashcan = new TrashCanImage()
  static robot = RobotImage
}
