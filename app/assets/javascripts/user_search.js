$(function(){
  var search_list = $("#user-search-result");

  var member_list = $("#chat-group-users");


  function appendUser(user){
    var searchedUserHTML = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${user.name}</p>
        <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</a>
      </div>`
    search_list.append(searchedUserHTML);
  }

  function addMember(id, name){
    var addMemberHTML = `
      <div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${id}'>
        <input name='group[user_ids][]' type='hidden' value=${id}>
        <p class='chat-group-user__name'>${name}</p>
        <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
      </div>`
    member_list.append(addMemberHTML)
  }
  function appendErrMsgToHTML(msg){
    var errMsgHTML = `<div class="chat-group-user clearfix">${msg}</div>`
    search_list.append(errMsgHTML)
  }

  $('#user-search-field').on('keyup', function(){
    var input = $('#user-search-field').val();

    $.ajax({
      type:     'GET',
      url:      '/users',
      data:     { user_name: input },
      dataType: 'json'
    })

    .done(function(users){
      $(search_list).empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      } else {
        appendErrMsgToHTML('一致するユーザーはありません');
      }
    })
    .fail(function(){
      alert('ユーザー検索に失敗しました');
    });
  });

  $(document).on('click', ".chat-group-user__btn--add", function(){
    $(search_list).empty();
    var user_id = $(this).attr("data-user-id")
    var user_name = $(this).attr("data-user-name")
    addMember( user_id, user_name );
  })

  $(document).on('click', ".chat-group-user__btn--remove", function(){
    $(this).parent().remove();
  })
})
