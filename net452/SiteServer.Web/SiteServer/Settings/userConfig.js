﻿var $url = '/pages/settings/userConfig';

var $data = {
  pageLoad: false,
  pageAlert: null,
  pageType: null,
  config: null,
  isUserRegistrationAllowed: null,
  isUserRegistrationChecked: null,
  isUserUnRegistrationAllowed: null,
  userPasswordMinLength: null,
  userPasswordRestriction: null,
  userRegistrationMinMinutes: null,
  isUserLockLogin: null,
  userLockLoginCount: null,
  userLockLoginType: null,
  userLockLoginHours: null,
  userFindPasswordSmsTplId: null
};

var $methods = {
  getConfig: function () {
    var $this = this;

    $api.get($url).then(function (response) {
      var res = response.data;

      $this.config = _.clone(res.value);

      $this.isUserRegistrationAllowed = res.value.isUserRegistrationAllowed;
      $this.isUserRegistrationChecked = res.value.isUserRegistrationChecked;
      $this.isUserUnRegistrationAllowed = res.value.isUserUnRegistrationAllowed;
      $this.userPasswordMinLength = res.value.userPasswordMinLength;
      $this.userPasswordRestriction = res.value.userPasswordRestriction;
      $this.userRegistrationMinMinutes = res.value.userRegistrationMinMinutes;
      $this.isUserLockLogin = res.value.isUserLockLogin;
      $this.userLockLoginCount = res.value.userLockLoginCount;
      $this.userLockLoginType = res.value.userLockLoginType;
      $this.userLockLoginHours = res.value.userLockLoginHours;
      $this.userFindPasswordSmsTplId = res.value.userFindPasswordSmsTplId;

      $this.pageType = 'list';
    }).catch(function (error) {
      $this.pageAlert = utils.getPageAlert(error);
    }).then(function () {
      $this.pageLoad = true;
    });
  },

  submit: function (item) {
    var $this = this;

    utils.loading(true);
    $api.post($url, {
      isUserRegistrationAllowed: $this.isUserRegistrationAllowed,
      isUserRegistrationChecked: $this.isUserRegistrationChecked,
      isUserUnRegistrationAllowed: $this.isUserUnRegistrationAllowed,
      userPasswordMinLength: $this.userPasswordMinLength,
      userPasswordRestriction: $this.userPasswordRestriction,
      userRegistrationMinMinutes: $this.userRegistrationMinMinutes,
      isUserLockLogin: $this.isUserLockLogin,
      userLockLoginCount: $this.userLockLoginCount,
      userLockLoginType: $this.userLockLoginType,
      userLockLoginHours: $this.userLockLoginHours,
      userFindPasswordSmsTplId: $this.userFindPasswordSmsTplId
    }).then(function (response) {
      var res = response.data;

      $this.pageAlert = {
        type: 'success',
        html: '用户设置保存成功！'
      };
      $this.config = _.clone(res.value);
      $this.pageType = 'list';
    }).catch(function (error) {
      $this.pageAlert = utils.getPageAlert(error);
    }).then(function () {
      utils.loading(false);
    });
  },

  getPasswordRestrictionText: function (val) {
    if (val === 'LetterAndDigit') return '字母和数字组合';
    else if (val === 'LetterAndDigitAndSymbol') return '字母、数字以及符号组合';
    else return '不限制';
  },

  btnSubmitClick: function () {
    var $this = this;
    this.$validator.validate().then(function (result) {
      if (result) {
        $this.submit($this.item);
      }
    });
  }
};

new Vue({
  el: '#main',
  data: $data,
  methods: $methods,
  created: function () {
    this.getConfig();
  }
});