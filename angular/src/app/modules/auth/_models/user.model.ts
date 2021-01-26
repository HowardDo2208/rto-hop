import { AuthModel } from './auth.model';
import { AddressModel } from './address.model';
import { SocialNetworksModel } from './social-networks.model';

export class UserModel extends AuthModel {
  userId: number;
  userName: string;
  userPassword: string;
  userType: string;
  userFullName: string;
  userRemark: string;
  userImagePath: string;
  posId: number;
  noticeMobile: string;
  noticeEmail: string;
  checkDeviceImei: string;
  assignments: string[];

  emailSettings: {
    emailNotification: boolean,
    sendCopyToPersonalEmail: boolean,
    activityRelatesEmail: {
      youHaveNewNotifications: boolean,
      youAreSentADirectMessage: boolean,
      someoneAddsYouAsAsAConnection: boolean,
      uponNewOrder: boolean,
      newMembershipApproval: boolean,
      memberRegistration: boolean
    },
    updatesFromKeenthemes: {
      newsAboutKeenthemesProductsAndFeatureUpdates: boolean,
      tipsOnGettingMoreOutOfKeen: boolean,
      thingsYouMissedSindeYouLastLoggedIntoKeen: boolean,
      newsAboutMetronicOnPartnerProductsAndOtherServices: boolean,
      tipsOnMetronicBusinessProducts: boolean
    }
  };

  setUser(user: any) {
    this.userId = user.userId;
    this.userName = user.userName || '';
    this.userType = user.userType || '';
    this.userFullName = user.userFullName || '';
    this.userRemark = user.userRemark || '';
    this.userImagePath = user.userImagePath || './assets/media/users/default.jpg';
    this.posId = user.posId || [];
    this.noticeMobile = user.noticeMobile || '';
    this.noticeEmail = user.noticeEmail || '';
    this.checkDeviceImei = user.checkDeviceImei || '';
    this.assignments = user.assignments;
  }
}
