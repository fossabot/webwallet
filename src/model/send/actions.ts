import { SEND, PENDING } from '../action-types';
import { commonActions } from '../commons/actions';
import store from '../store';
import { riot } from '../../components/riot-ts';
import { removeUserKey, getUserKey } from '../utils';
import SendService from './send-service';
import Wallet from '../wallet';
import { getLocation } from '../utils';

export const sendActions = {
    createRawTx(targetWallet, amount, message) {
        let tx = null;
        let wallet = store.getState().userData.wallets[0];
        return (dispatch) => {
            dispatch(commonActions.toggleLoading(true));
            SendService.singleton().createRawTx(targetWallet.address, amount, message).then((resp: any) => {
                if (resp.rc === 1) {
                    tx = wallet.signTx(resp.transaction.rawtx);
                    let txn_info: any = {
                        ip: getLocation().info.ip,
                        amount: amount,
                        currency_type: 1,
                        receiver_bare_uid: targetWallet.email,
                        receiver_public_address: targetWallet.address,
                        receiver_id: targetWallet.username,
                        transaction_id: tx.getId(),
                        transaction_hex: tx.toHex(),
                        memo: targetWallet.memo,
                    };

                    if (targetWallet.needUpdateRequestId) {
                        txn_info.request_id = targetWallet.RequestId;
                        txn_info.status = 0;
                    }
                    SendService.singleton().addTxn(txn_info, wallet).then((resp: any) => {
                        if (resp.rc == 1) {
                            if (targetWallet.needUpdateRequestId) {
                                let criteria = {
                                    request_id: targetWallet.RequestId,
                                    sender_bare_uid: targetWallet.email,
                                    note_processing: targetWallet.memo
                                };

                                SendService.singleton().markSentMoneyRequests(criteria).then((resp: any) => {
                                    // TODO: Reload all TXN in pending page
                                    if (resp.rc == 1) {
                                        dispatch(sendActions.markSentMoneyRequestsSuccess(resp));
                                    } else {
                                        console.log('markSentMoneyRequests failed');
                                    }
                                });
                            } else {
                                dispatch(sendActions.clearForm());
                            }
                            //Auto Approve
                            if (targetWallet.email) {
                                let criteria = {
                                    bare_uid: targetWallet.email
                                };
                                SendService.singleton().addToRoster(criteria).then((resp: any) => {
                                    if (resp.rc === 1) {
                                        console.log('Add to roster success');
                                    } else {
                                        console.log('Add to roster failed');
                                    }
                                });
                            }
                            // TODO: dispatch action "wallet-ready"
                            checkTx(dispatch, txn_info);
                            dispatch(commonActions.toggleLoading(false));
                        } else {
                            dispatch(this.sendTXNFailed(resp));
                        }
                    });
                }
            });
        }
    },

    clearForm() {
        return ({ type: SEND.CLEAR_FORM })
    },
    sendTXNSuccess(processing_duration) {
        return ({ type: SEND.SEND_TXN_SUCCESSFUL, data: processing_duration })
    },
    sendTXNFailed(resp) {
        let msg = (resp.rc === 499) ? "Request timed out. Please check your Internet connection." : resp.reason;
        return { type: SEND.SEND_TXN_FAILED, data: msg }
    },
    markSentMoneyRequestsSuccess(resp) {
        return { type: PENDING.MARK_SENT_MONEY_REQUESTS_SUCCESS, data: resp }
    }

}

let count = 0;

let checkTx = (dispatch, txInfo) => {
    SendService.singleton().getTxnById(txInfo).then((resp: any) => {
        if (resp && resp.rc === 1 && resp.txn.status === 1) {
            dispatch(sendActions.sendTXNSuccess(resp.txn.processing_duration.toFixed(3)));
        } else if (count < 5) {
            setTimeout(checkTx, 1000);
        }
    });
}

