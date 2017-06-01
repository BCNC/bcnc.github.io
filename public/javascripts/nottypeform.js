let activeIndex = 0;
let scrollTopPadding = -100;
let wrapper;
let fields;

function setActiveTab() {
  fields.removeClass('active');
  let activeField = fields.eq(activeIndex);
  activeField.addClass('active');
  activeField.find('input').focus();
}

function scrollToActiveField(field) {
  let index = fields.index(field);
  if (index !== activeIndex) {
    activeIndex = index;
    let offset = $(field).offset().top;
    wrapper.animate({scrollTop: wrapper.scrollTop() + offset + scrollTopPadding}, 200)
    setActiveTab();
  }
}

function scrollToActiveFieldByIndex(index) {
  scrollToActiveField(fields.eq(index));
}

$(document).ready(() => {
  wrapper = $('.wrapper');
  fields = $('.field'); 
  fields.click(function() {
    scrollToActiveField(this);
  });
  let inputs = $('.field input');
  inputs.focus(function(){
    scrollToActiveField($(this).parent());
  });
  inputs.keydown(function(event) {
    if (event.keyCode === 13 && this.validity.valid) { // enter
        let nextInputIndex = inputs.index(this) + 1;
        if (nextInputIndex < inputs.length) {
          inputs.eq(nextInputIndex).focus();
        }
      }
  });
  
  setActiveTab();
});
