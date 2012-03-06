(function() {

  (function(exports) {
    Ember.Facebook = Ember.Mixin.create({
      FBUser: void 0,
      appId: void 0,
      fetchPicture: true,
      init: function() {
        this._super();
        return window.FBApp = this;
      },
      appIdChanged: (function() {
        var _this = this;
        this.removeObserver('appId');
        window.fbAsyncInit = function() {
          return _this.fbAsyncInit();
        };
        return $(function() {
          var js;
          $('body').append($("<div>").attr('id', 'fb-root'));
          js = document.createElement('script');
          $(js).attr({
            id: 'facebook-jssdk',
            async: true,
            src: "//connect.facebook.net/en_US/all.js"
          });
          return $('head').append(js);
        });
      }).observes('appId'),
      fbAsyncInit: function() {
        var _this = this;
        FB.init({
          appId: this.get('appId'),
          status: true,
          cookie: true,
          xfbml: true
        });
        this.set('FBloading', true);
        FB.Event.subscribe('auth.authResponseChange', function(response) {
          return _this.updateFBUser(response);
        });
        return FB.getLoginStatus(function(response) {
          return _this.updateFBUser(response);
        });
      },
      updateFBUser: function(response) {
        var _this = this;
        if (response.status === 'connected') {
          return FB.api('/me', function(user) {
            var FBUser;
            FBUser = user;
            FBUser.accessToken = response.authResponse.accessToken;
            if (_this.get('fetchPicture')) {
              return FB.api('/me/picture', function(path) {
                FBUser.picture = path;
                _this.set('FBUser', FBUser);
                return _this.set('FBloading', false);
              });
            } else {
              _this.set('FBUser', FBUser);
              return _this.set('FBloading', false);
            }
          });
        } else {
          this.set('FBUser', false);
          return this.set('FBloading', false);
        }
      }
    });
    return Ember.FacebookView = Ember.View.extend({
      classNameBindings: ['className'],
      init: function() {
        var attr, _results;
        this._super();
        this.setClassName();
        _results = [];
        for (attr in this) {
          if (attr.match(/^data-/) != null) {
            _results.push(this.attributeBindings.pushObjects(attr));
          }
        }
        return _results;
      },
      setClassName: function() {
        return this.set('className', "fb-" + this.type);
      },
      parse: function() {
        if (typeof FB !== "undefined" && FB !== null) {
          return FB.XFBML.parse(this.$().parent()[0].context);
        }
      },
      didInsertElement: function() {
        return this.parse();
      }
    });
  })({});

}).call(this);
