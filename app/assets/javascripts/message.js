$(function(){
  function buildHTML(message){
    var image = message.image.url ? message.image.url : "";
    var html = `<div class="message" data-id=${message.id}>
                  <div class="message__info">
                    <p class="message__info__user">
                      ${message.user_name}
                    </p>
                    <p class="message__info__date">
                      ${message.created_at}
                    </p>
                  </div>
                  <div class="message__text">
                    <p class="message__text__content">
                      ${message.content}
                    </p>
                    <img class="message__image" src=${image}>
                  </div>
                </div>`;
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildHTML(message);
      $('.messages').append(html);
      $('#new_message')[0].reset();
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    })
    .fail(function(){
      alert('error');
    })
    .always(function(){
      $('.submit-btn').removeAttr('disabled');
    })
  });

  var reloadMessages = function(){
    last_message_id = $(".message:last").data('id');
    pathname = location.pathname.split('/')[2];
    $.ajax({
      url:      `/groups/${pathname}/api/messages`,
      type:     'GET',
      dataType: 'json',
      data:     {id: last_message_id}
    })
    .done(function(messages){
      var insertHTML = '';
      if (messages.length !== 0) {
        messages.map(function(message){
          insertHTML = buildHTML(message);
          $('.messages').append(insertHTML);
        });
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    };
    })
    .fail(function(){
      console.log('error');
    });
  };
  setInterval(reloadMessages, 5000);
});
