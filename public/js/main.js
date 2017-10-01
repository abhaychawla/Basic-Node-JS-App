$(document).ready(function() {

  //Article delete client side action here
  $('#delete-article').on('click', function(params) {
    var id = $(params.target).attr('articleid');
    $.ajax({
      type: 'DELETE',
      url: '/article/'+id,
      success: function(res) {
        window.location.href = '/';
        alert('Article deleted!');
      },
      error: function(err) {
        console.log(err);
      }
    });
  });

});
