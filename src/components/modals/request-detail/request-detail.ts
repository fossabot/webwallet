import { riot, template, Element } from '../../riot-ts';
import store, { ApplicationState } from '../../../model/store';
import RequestDetailTemplate from './request-detail.html!text';
import Constants from '../../../model/constants';
import { pendingActions } from '../../../model/pending/actions';
import { SEND, PENDING, COMMON } from '../../../model/action-types';
import * as utils from '../../../model/utils';
import { TAB } from '../../../model/pending/types';
import { FCEvent } from '../../../model/types';
import { getText } from '../../localise';

@template(RequestDetailTemplate)
export default class RequestDetail extends Element {
  private AvatarServer = Constants.AvatarServer;
  private decimalFormat = utils.decimalFormat;
  private strimString = utils.strimString;
  private getDisplayDateTime = utils.getDisplayDateTime;
  private getText = getText;

  constructor() {
    super();
  }

  mounted() {
    $('#requestDetailDlg').modal('show');
  }

  cancelRequest() {
    if (this.opts.cancelCb) {
      this.opts.cancelCb();
    }
  }

  acceptRequest() {
    if (this.opts.acceptCb) {
      this.opts.acceptCb();
    }
  }

  rejectRequest() {
    if (this.opts.rejectCb) {
      this.opts.rejectCb();
    }
  }
}
