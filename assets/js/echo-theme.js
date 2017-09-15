/**
 * Main.js
 *
 */
(function($) {

  function escapeHtml(text) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  $('a').on('click', function(e){

    if ( $(this).attr("href") === '#' ) {
      e.preventDefault();
    }
  });

  $('.echo__example').each( function() {
    var $this = $(this);
    var code = $this.html();

    $this.parent().append('<div class="echo__code-section">' +
                            '<button class="echo__toggle-code-display echo__button">Show Code</button>' +
                            '<pre class="language-html echo__code-display"><code class="language-html">' +
                            '</code></pre>' +
                          '</div>');
    $this.parent().find('pre code').text(code);
  });

  $('.echo__for-code-target').each( function() {
    var $this = $(this);
    var txt   = $this.html();
    $this.closest('.echo__example').find('.echo__code-target').text(txt);
  });

  $('.echo__toggle-code-display').on('click', function() {
    var $this = $(this);
    $this.toggleClass('open');
    $this.next('pre').slideToggle();
    if ( $this.text() == 'Hide Code' ) {
      $this.text('Show Code');
    } else {
      $this.text('Hide Code');
    }
  });


  $('#echo__toggle-header-class').on('click', function() {
    $('#echo__toggle-header-wrapper').find('header').toggleClass('shorten');
  });

})(jQuery); // Fully reference jQuery after this point.