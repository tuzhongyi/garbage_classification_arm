import '../../../assets/styles/table-sticky.less'

import './ai-model-deployment.less'
import { AIModelDeploymentDetailsController } from './controller/ai-model-deployment-details.controller'
import { AIModelDeploymentListController } from './controller/ai-model-deployment-list.controller'
export class AIModelDeploymentHtmlController {
  list = new AIModelDeploymentListController()
  details = new AIModelDeploymentDetailsController()
}
