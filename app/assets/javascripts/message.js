$(function(){
  function buildHTML(message){
    var imageHTML = (message.image) ? `<img class="message__image" src=${message.image.url}>` :  "";
    var html = `<div class="message">
                  <div class="message__info">
                    <p class="message__info__user">
                      ${message.user_name}
                    </p>
                    <p class="message__info__date">
                      ${message.time}
                    </p>
                  </div>
                  <div class="message__text">
                    <p class="message__text__content">
                      ${message.content}
                    </p>
                    ${imageHTML}
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
      console.log('sucsess!!')
      var html = buildHTML(message);
      $('.messages').append(html);
      $('img').error(function(){
        $(this).remove();
      });
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
});
