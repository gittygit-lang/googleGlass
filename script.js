// Cleaned script: hover, open/close, maximize, and draggable behavior
$(function(){
  var $window = $('#window');
  var $content = $('#content');
  var $title = $('#title-bar');
  var $square = $('#square');
  var $exit = $('#exit');
  var $minimize = $('#minimize');
  var $clickme = $('#clickme');

  // Hover styles for title bar buttons
  $minimize.hover(function(){ $(this).css({'background-color':'#272727','cursor':'context-menu'}); }, function(){ $(this).css({'background-color':'black','cursor':'default'}); });
  $square.hover(function(){ $(this).css({'background-color':'#272727','cursor':'context-menu'}); }, function(){ $(this).css({'background-color':'black','cursor':'default'}); });
  $exit.hover(function(){ $(this).css({'background-color':'red','cursor':'context-menu'}); }, function(){ $(this).css({'background-color':'black','cursor':'default'}); });

  // Image hover to darken
  $clickme.on('mouseover', function(){ $(this).css({'filter':'brightness(0.8)','cursor':'pointer'}); });
  $clickme.on('mouseout', function(){ $(this).css({'filter':'brightness(1)'}); });

  // Open window
  $clickme.on('click', function(){ $window.fadeIn(120); });

  // Exit (fade out)
  $exit.on('click', function(){ $window.fadeOut(200); });

  // Helper to restore to normal size
  function restoreWindow() {
    $window.css({position: 'relative', left: 'auto', top: 'auto', width: '60%', height: '659px', margin: '10px auto'});
    $content.css('height','600px');
    $square.removeClass('enlarged');
  }

  // Maximize / restore toggle
  $square.on('click', function(){
    if($square.hasClass('enlarged')){
      // restore
      restoreWindow();
    } else {
      // maximize
      $window.css({position: 'fixed', left: 0, top: 0, width: '100%', height: '100vh', margin: 0});
      $content.css('height','calc(100vh - 59px)');
      $square.addClass('enlarged');
    }
  });

  // Draggable behavior
  $title.on('mousedown', function(e){
    e.preventDefault();
    var dr = $window;
    var titleHeight = $title.outerHeight() || 31;

    // If enlarged, restore and position so mouse touches middle of title bar
    if($square.hasClass('enlarged')){
      restoreWindow();
      dr.outerWidth(); // force reflow
      var winW = dr.outerWidth();
      var newLeft = e.pageX - Math.round(winW/2);
      var newTop = e.pageY - Math.round(titleHeight/2);
      dr.offset({left: newLeft, top: newTop});
    }

    var startOffset = dr.offset();
    var offsetX = e.pageX - startOffset.left;
    var offsetY = e.pageY - startOffset.top;

    dr.addClass('drag');

    $(document).on('mousemove.windowDrag', function(ev){
      var newLeft = ev.pageX - offsetX;
      var newTop = ev.pageY - offsetY;
      dr.offset({left: newLeft, top: newTop});
    }).on('mouseup.windowDrag', function(){
      dr.removeClass('drag');
      $(document).off('.windowDrag');
    });
  });

});