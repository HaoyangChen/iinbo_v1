'use strict';

$("#search-btn").click(event => {
    event.preventDefault();
    let query = $('#search-book-box').val();
    sessionStorage.setItem('inputQuery', query);
    window.location.href = "searchpage.html";
})

$("#search-mobile-btn").click(event => {
    event.preventDefault();
    let query = $('#search-mobile-box').val();
    sessionStorage.setItem('inputQuery', query);
    window.location.href = "searchpage.html";
})

if($('#sign-up').length !== 0) {
    $('#sign-up').click(event => {
        event.preventDefault();
        window.location.href= "signup.html";
    });
}