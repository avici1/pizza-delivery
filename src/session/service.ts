import BaseService from '../Base/service';
import SessionModel from './model';

const sessionModel = new SessionModel();

export default class Service extends BaseService {
  constructor() {
    super(sessionModel.getSessionModel());
  }
}
