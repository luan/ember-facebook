((exports) ->
  Ember.Facebook = Ember.Mixin.create
    FBUser: undefined
    appId: undefined
    fetchPicture: true

    init: ->
      @_super()
      window.FBApp = this

    appIdChanged: (->
      @removeObserver('appId')
      window.fbAsyncInit = => @fbAsyncInit()
    
      $ ->
        $('body').append($("<div>").attr('id', 'fb-root'))
        js = document.createElement 'script'

        $(js).attr
          id: 'facebook-jssdk'
          async: true
          src: "//connect.facebook.net/en_US/all.js"

        $('head').append js
    ).observes('appId')

    fbAsyncInit: ->
      FB.init
        appId:  @get 'appId'
        status: true
        cookie: true
        xfbml:  true

      @set 'FBloading', true
      FB.Event.subscribe 'auth.authResponseChange', (response) => @updateFBUser(response)
      FB.getLoginStatus (response) => @updateFBUser(response)

    updateFBUser: (response) ->
      if response.status is 'connected'
          FB.api '/me', (user) =>
            FBUser = user
            FBUser.accessToken = response.authResponse.accessToken

            if @get 'fetchPicture'
              FB.api '/me/picture', (path) =>
                FBUser.picture = path
                @set 'FBUser', FBUser
                @set 'FBloading', false
            else
              @set 'FBUser', FBUser
              @set 'FBloading', false
      else
        @set 'FBUser', false
        @set 'FBloading', false

  Ember.FacebookView = Ember.View.extend
    classNameBindings: ['className']

    init: ->
      @_super()
      @setClassName()
      @attributeBindings.pushObjects attr for attr of this when attr.match(/^data-/)?

    setClassName: ->
      @set 'className', "fb-#{@type}"

    parse: ->
      FB.XFBML.parse @$().parent()[0].context if FB?

    didInsertElement: ->
      @parse()
)({})