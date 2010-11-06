var Site = Site || {};


(function(Site){

  // Gallery Plugin
  Site.gallery = function(options){
    $.extend(true,this,options);
  };
  
  Site.gallery.prototype = { 
    viewer:     null,
    scrollable: null,
    
    onSeek: function(a,index){
      this.getItems().
        eq(index).
        find('img:first').
        trigger('click');
    },
  
    init: function(){
      var scrollable = this.scrollable,
          viewer     = this.viewer;
  
      scrollable.
        scrollable({ onSeek: this.scrollableOptions }).
        find('.item img').
          live('click',function(){
            var element = $(this),
              newSrc = element.attr('data-src'),
              oldImage = viewer.find('img'),
              newImage = $(new Image());
            
            scrollable.
              find('img').
              removeClass('current');
  
            element.addClass('current');
            
            oldImage.before(newImage);
            newImage.load(function(){ 
              oldImage.fadeOut('fast',function(){
                console.log("remove");
                oldImage.remove();
              });
            }).attr('src',newSrc);
          });
    },
  
    run: function(){
    //fake human mouse click to start it off.
      this.scrollable.
        find('.item img').
        first().
        trigger('click');
    }
  };
})(Site);
