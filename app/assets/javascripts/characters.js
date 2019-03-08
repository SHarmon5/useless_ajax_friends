var currentChar = {};
var showForm = false;
var editCharacter;

$(document).ready(function() {

  $('#toggle').on('click', function() {
    toggle();
  })

  function toggle() {
    showForm = !showForm;
    $('#character-form').remove()
    $('#char-list').toggle()

    if (showForm) {

      $.ajax({
        url: '/character_form',
        method: 'GET',
        data: {id: editCharacter}
      }).done(function(html) {
        $('#toggle').after(html);
      })
    }
  }

    

  $(document).on('submit', '#character-form form', function(e) {
    e.preventDefault();
    var data = $(this).serializeArray();
    e.preventDefault();
    var data = $(this).serializeArray();
    var url = '/characters';
    var method = 'POST'
    if (editCharacter) {
    url = url + '/' + editCharacter;
    method = 'PUT'
  }

    $.ajax({
      url: '/characters',
      type: 'POST',
      dataType: 'JSON',
      data: data
    }).done( function(character) {
        toggle();
        getCharacter(character.id);

        // var c = '<li class="char-item" data-id="' + character.id + '" data-name="' + character.name + '">' + character.
        // name + '</li>';
        // $('#char-list').append(c);
    })
  });

  function getCharacter(id) {
    $.ajax({
      url: '/characters/' + id,
      method: 'GET'
    }).done( function(character) {
      if (editCharacter) {
        var li = $("[data-id='" + id + "'")
        $(li).replaceWith(character)
        editCharacter = null
      } else {
      $('#char-list').append(character);
      }
    });
  }

  $(document).on('click', '#edit-char', function() {
    editCharacter = $(this).siblings('.char-item').data().id
    toggle();
  });

  $(document).on('click', '#delete-character', function() {
    var id = $(this).siblings('.char-item').data().id
    $.ajax({
      url: '/characters/' + id,
      method: 'DELETE'
    }).done( function() {
      var row = $("[data-id='" + id + "'")
      row.parent().remove('li');
    });
  });
 


  $(document).on('click', '.char-item', function() {
    currentChar.id = this.dataset.id;
    currentChar.name = this.dataset.name;
    $.ajax({
      url: '/characters/' + currentChar.id + '/quotes',
      method: "GET",
      dataType: "JSON"
    }).done(function(quotes) {
      var list = $('#quotes');
      $('#character').text('Quotes in ' + currentChar.name);
      list.empty();
      quotes.forEach(function(saying) {
        var li = '<li data-quote-id="' + saying.id + '">' + saying.description + '</li>'
        list.append(li)
      })

      


    })
  })
})