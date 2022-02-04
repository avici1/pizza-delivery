import { Model } from 'mongoose';
import BaseService from '../Base/service';
import UserModel from './model';

const userModel: UserModel = new UserModel();

export default class Service extends BaseService {
    constructor() {
        super(userModel);
    }
}