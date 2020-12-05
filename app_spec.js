function resetList() {
  var todoLis = document.querySelectorAll('#todo-list li');
  var deleteButtons = document.getElementsByClassName('destroy');
  for (var i = 0; i < todoLis.length; i++) {
    deleteButtons[0].click();
  }
}

function createTodo() {
  var input = document.getElementById('new-todo');
  input.value = 'Frameworks suuuuuck';
  pressEnterKey(input);
  return document.querySelector('li');
}

function pressEnterKey(input) {
  var enterKeyEvent = document.createEvent('Event');
  enterKeyEvent.initEvent('keyup');
  enterKeyEvent.keyCode = 13;
  enterKeyEvent.which = 13;
  input.dispatchEvent(enterKeyEvent);
}

function enableEditing(todoLabel) {
  var doubleClickEvent = new MouseEvent('dblclick', {
    bubbles: true,
    cancelable: true,
    view: window
  });
  todoLabel.dispatchEvent(doubleClickEvent);
}

function clickToggleAllButton() {
  var toggleAllButton = document.getElementById('toggle-all');
  toggleAllButton.click();
}

tests({
  'It should add a todo.': function() {
    resetList();
    createTodo();
    var todoLis = document.querySelectorAll('#todo-list li');
    eq(todoLis.length, 1);
  },

  'It should delete a todo.': function() {
    resetList();
    createTodo();
    var deleteButtons = document.getElementsByClassName('destroy');
    deleteButtons[0].click();
    eq(deleteButtons.length, 0);
  },

  'It should toggle a todo.': function() {
    resetList();
    createTodo();
    var toggleButtons = document.getElementsByClassName('toggle');
    toggleButtons[0].click();
    eq(toggleButtons[0].checked, true);

    clickToggleAllButton();
  },

  'It should toggle all todos.': function() {
    resetList();
    createTodo();
    createTodo();
    var toggleButtons = document.getElementsByClassName('toggle');
    toggleButtons[0].click();

    clickToggleAllButton();
    
    eq(toggleButtons[0].checked, true);
    eq(toggleButtons[1].checked, true);
  },

  'It should edit a todo.': function() {
    resetList();
    var todo = createTodo();
    var todoInput = todo.querySelector('input.edit');
    var todoLabel = todo.querySelector('label');
    var todoTitleEdited = 'Edited';

    enableEditing(todoLabel);
    todoInput.dispatchEvent(new Event('focus'));
    todoInput.value = todoTitleEdited;
    todoInput.dispatchEvent(new Event('blur'));

    var todoLabelAfterRender = document.querySelector('#todo-list label');
    eq(todoLabelAfterRender.textContent, todoTitleEdited);
  },

  // 'It should not contain any methods.': function() {
  //   resetList();
  //   var appText;
  //   fetch('app.js')
  //     .then(function(response) {
  //       return response.text();
  //     })
  //     .then(function(data) { 
  //       return appText = data;
  //     });
  //   setTimeout(function() {
  //     var textToSearch = appText;
  //     var regex = /(?<!"|'): function/g;                       // Negative lookbehind, does not catch Router.
  //     // var regex = /: function/g;                            // Catches Router.
  //     // var regex = /((':|":) function){1}|(: function)+/g;   // Does not catch Router, but third segment needs work.
  //     var result = regex.test(textToSearch);
  //     eq(result, false);
  //   }, 300);
  // }
});