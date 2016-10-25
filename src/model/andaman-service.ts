import Andaman from "Andaman";

interface IAndaman {
    get_txns(pipe, credentials, callback: (resp) => any);
    get_session_token_v2(pipe, credentials: { idToken: string, res?: string }, cb: (resp) => any);
    sso_login_v2(pipe, credentials: { email: string, password: string, res?: string }, cb: (resp) => any);
    get_profile(pipe, opts: any, cb: (resp) => any);
    get_txn_details(pipe, params: { transaction_id: string }, cb: (resp) => any);
    search_wallet(pipe, params: { term: string, start: number, size: number }, cb: (resp) => any);
    get_my_wallets(pipe, params: {}, cb: (resp) => any);
    create_unsigned_raw_txn(pipe, params: {}, cb: (resp) => any);
    add_txn(pipe, params: {}, cb: (resp) => any);
    mark_sent_money_requests(pipe, params: {}, cb: (resp) => any);
    add_to_roster(pipe, params: {}, cb: (resp) => any);
    get_txn_by_id(pipe, params: {}, cb: (resp) => any);
    get_wallet_secret(pipe, params: {}, cb: (resp) => any);
    request_money(pipe, params: {}, cb: (resp) => any);
    send_request(pipe, params: {}, cb: (resp) => any);
    get_requests(pipe, params: {}, cb: (resp) => any);
    get_wallets_by_email(pipe, params: {}, cb: (resp) => any);
    get_balance(pipe, params: {}, cb: (resp) => any);
    mark_rejected_money_requests(pipe, params: {}, cb: (resp) => any);
    mark_cancelled_money_requests(pipe, params: {}, cb: (resp) => any);
    get_roster(pipe, params: {}, cb: (resp) => any);
    get_users_by_uid(pipe, params: {}, cb: (resp) => any);
    remove_user(pipe, params: {}, cb: (resp) => any);
    sso_reset_password_mail(pipe, params: {}, cb: (resp) => any);
    get_recovery_keys(pipe, params: {}, cb: (resp) => any);
    sso_reset_password(pipe, params: {}, cb: (resp) => any);
}

export default class AndamanService {
    private static service = Andaman;
    public static readonly AvatarServer = `http://${Andaman.opts.host}/profile/`;
    public static readonly clientHost = 'flashcoin.io';

    static ready(): Promise<{ andaman: IAndaman, pipe: any }> {
        return AndamanService.service.ready();
    }
}