$(function(){
  function buildHTML(message){
    var html = `<div class="message">
                  <div class="message__info">
                    <p class="message__info__user">
                      ${message.user_name}
                    </p>
                    <p class="message__info__date">
                      ${message.time}
                    </p>
                  </div>
                  <p class="message__text">
                    <p class="message__text__content">
                        ${message.content}
                    </p>
                    <img class="message__image" src=${message.image.url}>
                  </p>
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
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.form__message').val('');
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
