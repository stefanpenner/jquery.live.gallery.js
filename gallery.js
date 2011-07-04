(function(){
  $.fn.imageFadeIn = function(){
    this.each(function(){
      var image = $(this),
            src = image.attr('src');

      image.load(function(){
        image.fadeIn();
      }).attr('src',src);
    });
  };

  var Gallery = $.fn.liveGallery = function(options){
    $.extend(true,this,options);
  },

  // set your own global custom prefix
  PREFIX      = $.fn.PREFIX      = $.fn.PREFIX      || '.';

  Gallery.prototype = {
    viewer:     null,
    scrollable: null,
    gallerySelector:    PREFIX+'gallery',
    viewerSelector:     PREFIX+'viewer',
    currentSelector:    PREFIX+'current',
    scrollableSelector: PREFIX+'scrollable',
    thumbnailSelector:  PREFIX+'item img',

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
        scrollable({ onSeek: this.onSeek }).
        find(this.thumbnailSelector).
          live('click',function(){
            var element = $(this),
              newSrc = element.attr('data-src'),
              oldImage = viewer.find('img'),
              newImage = $(new Image());

              scrollable.
              find('img').
              removeClass(this.currentSelector);

            element.addClass(this.currentSelector);

            oldImage.before(newImage);
            newImage.load(function(){
              oldImage.fadeOut('fast',function(){
                oldImage.remove();
              });
            }).attr('src',newSrc);
          });
    },

    run: function(){
    //fake human mouse click to start it off.
      this.scrollable.
        find(this.thumbnailSelector).
        first().
        trigger('click');
    }
  };

  Gallery.run = function(){
    $('img.'+PREFIX+'fade-in').imageFadeIn();
    var gallery = new Site.gallery({
        viewer:     $(this.viewerSelector),
        scrollable: $(this.scrollableSelector)
    });

    gallery.init();
    gallery.run();
  };

  $(function(){
    $(this.gallerySelector).liveGallery();
  });
})();
