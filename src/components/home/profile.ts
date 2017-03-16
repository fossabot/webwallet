import { riot, template, Element } from '../riot-ts';
import store, { ApplicationState } from '../../model/store';
import HomeProfileTemplate from './profile.html!text';
import AndamanService from '../../model/andaman-service';
import { getUrlParam } from '../../model/utils';
import { TABS, PROFILE } from '../../model/action-types';

@template(HomeProfileTemplate)
export default class HomeProfile extends Element {

    private static unsubscribe = null;

    private userProfile = null;
    private avartarServer: string = null;

    private isProfile = true;
    private isSetting = false;
    private isFountain = false;
    private isQuestioning = false;

    mounted() {
        if (HomeProfile.unsubscribe) HomeProfile.unsubscribe();
        HomeProfile.unsubscribe = store.subscribe(this.onApplicationStateChanged.bind(this));

        this.userProfile = store.getState().userData.user;
        this.avartarServer = AndamanService.AvatarServer;
        this.mountComponents();
    }

    onApplicationStateChanged() {
        let state = store.getState();
        let data = state.profileData;
        let type = state.lastAction.type;


        if (type == TABS.SET_ACTIVE) {
            $('#tab-1').removeClass('active');
            $('#tab-2').addClass('active');
            this.onTabSelect('setting');
        }

        this.update();
    }

    mountComponents() {
        riot.mount('#profile-avatar', 'profile-avatar', {});
        riot.mount('#user-info', 'user-info', {});
        riot.mount('#account-setting', 'account-setting', {});
        riot.mount('#fountain-setting', 'fountain-setting', {});
        riot.mount('#security-question', 'security-question', {});
    }

    onTabSelect(tab) {
        if (tab == 'profile') {
            this.isProfile = true;
            this.isSetting = false;
            this.isFountain = false;
            this.isQuestioning = false;
        } else if (tab == 'setting') {
            this.isProfile = false;
            this.isSetting = true;
            this.isFountain = false;
            this.isQuestioning = false;
        } else if (tab == 'fountain') {
            this.isProfile = false;
            this.isSetting = false;
            this.isFountain = true;
            this.isQuestioning = false;
        }  else if (tab == 'securityquestion') {
            this.isProfile = false;
            this.isSetting = false;
            this.isFountain = false;
            this.isQuestioning = true;
        }
    }
}
