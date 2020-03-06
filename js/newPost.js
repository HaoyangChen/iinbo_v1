'use strict';
var card;
var postboard;

class Card{
    constructor(item,id=0) {
        this.id = id;
        this.item = item;
        this.authors =  $('#FinalBookAuthor').val();
        this.pricetag = $('#BookPrice').val();
        this.topic = $('#FinalTopic').val();
        this.condition = $('#Condition').val();
        this.descr = $('#moreDescription').val();
    }
    getid(){
        return this.id;
    }
    setid(newID){
        this.id = newID;
    }

    setT(newTopic){
        this.topic = newTopic;
    }
    setC(newCondition){
        this.condition = newCondition;
    }
    setD(newDescription){
        this.descr = newDescription;
    }



    render(){
        let searchCard = $('<div>');
        searchCard.addClass("search-card");
        let searchResultImg = $('<div>');
        searchCard.append(searchResultImg);
        searchResultImg.addClass('search-result-img');
        let resultImage = $('<img>');
        let imageLinks = this.item.volumeInfo.imageLinks;
        if (imageLinks) {
            resultImage.attr("src", imageLinks.thumbnail);
        } else {
                resultImage.attr("src", 'img/img-not-available.png');
            }
            searchResultImg.append(resultImage);
            let searchInfo = $('<div>');
            searchInfo.addClass('search-info');
            searchCard.append(searchInfo);
            let searchInfoTitle = $('<h2>');
            let bookTitle = $('#FinalBookName').val();
            searchInfoTitle.addClass('search-info-title');
            searchInfoTitle.append(document.createTextNode(bookTitle));
            searchInfo.append(searchInfoTitle);

            let author = $("<p>").append(document.createTextNode(this.authors));
            searchInfo.append(author);

            let priceNode = $("<p>").append(document.createTextNode(this.pricetag));
            searchInfo.append(priceNode);

            let topicName = "Topic: "
            topicName += this.topic;
            let topic = $("<p>").append(document.createTextNode(topicName));
            searchInfo.append(topic);

            let condName = "Condition: "
            condName += this.condition;
            let condition = $("<p>").append(document.createTextNode(condName));
            searchInfo.append(condition);

            let descrName = "Description: "
            descrName += this.descr;
            let descr = $("<p>").append(document.createTextNode(descrName));
            searchInfo.append(descr);

            let delBtn = $("<button>");
            delBtn.addClass("btn btn-light bg-btn-iinbo");
            delBtn.text('Delete This Post');
            delBtn.click(()=> {
                postboard.removeElement(this.id);
                postboard.render();
                // this.removeLiJQ(delBtn);
            });
            searchInfo.append(delBtn);
            return searchCard;
    }

    removeLiJQ(btnID) {
        var sc = $(btnID).parent().parent();
        sc.remove();
    }


}
class PostBoard{
    //elelemtns are array of Card
    constructor(elements) {
        this.elements = elements;
        this.countID =0;
    }
    addToElement(child){
        child.setid(this.countID);
        this.countID = this.countID + 1;
        this.elements.push(child);
    }
    removeElement(rid){
        this.elements = this.elements.filter(child => rid !== child.id)
    }
    cleanPostBoard(){
        let postboardid =$( "#post-place" )
        postboardid.empty();
    }
    render(){
        this.cleanPostBoard();
        let postboardid =$( "#post-place" )
        for (var i = 0; i < this.elements.length; i++) {
            postboardid.append(this.elements[i].render());
        }
    }
}
class CardItem {
  constructor(item) {
    this.item = item;
    this.state = {
    title :'',
    authors: '',
    price:''
    };
  }
  render(){
      let searchCard = $('<div>');
      searchCard.addClass("search-card");
      //parent.append(searchCard);
      let searchResultImg = $('<div>');
      searchCard.append(searchResultImg);
      searchResultImg.addClass('search-result-img');
      let resultImage = $('<img>');
      let imageLinks = this.item.volumeInfo.imageLinks;
      if (imageLinks) {
          resultImage.attr("src", imageLinks.thumbnail);
      } else {
          resultImage.attr("src", 'img/img-not-available.png');
      }
      searchResultImg.append(resultImage);
      let searchInfo = $('<div>');
      searchInfo.addClass('search-info');
      searchCard.append(searchInfo);
      let searchInfoTitle = $('<h2>');
      var bookTitle = this.item.volumeInfo.title;
      this.state.title = bookTitle;
      searchInfoTitle.addClass('search-info-title');
      searchInfoTitle.append(document.createTextNode(bookTitle));
      searchInfo.append(searchInfoTitle);

      // display author
      let authorName = "Author(s): "
      if (this.item.volumeInfo.authors) {
          let authorNameArray = this.item.volumeInfo.authors;
          authorName += authorNameArray[0];
          for (let i = 0; i < authorNameArray.length; i++) {
              authorName += ", " + authorNameArray[i];
          }
      } else {
          authorName += " Unknown"
      }
      this.state.authors = authorName;
      let author = $("<p>").append(document.createTextNode(authorName));
      searchInfo.append(author);
      let price = "Price: "
      if (this.item.saleInfo.listPrice) {
          let bookListPirce = this.item.saleInfo.listPrice;
          let bookPrice = bookListPirce.amount;
          let bookPriceCurrency = bookListPirce.currencyCode;
          price += bookPrice + " " + bookPriceCurrency;
      } else {
          let saleability = this.item.saleInfo.saleability;
          if (saleability === 'NOT_FOR_SALE') {
              saleability = 'NOT FOR SALE';
          }
          price += saleability;
      }
      this.state.price = price;
      let priceNode = $("<p>").append(document.createTextNode(price));
      searchInfo.append(priceNode);
      // Display EBook Availability
      let eTextNode = $("<p>");
      eTextNode.addClass("text-left");
      searchInfo.append(eTextNode);
      let etextSpan = $('<span>').append(document.createTextNode("E-Book Availability: "));
      eTextNode.append(etextSpan);

      if(this.item.accessInfo.viewability !== "NO_PAGES") {
          if(this.item.accessInfo.webReaderLink) {
              let eTextLink = $("<a>").append(document.createTextNode("Availabile"));
              eTextLink.attr('href', this.item.accessInfo.webReaderLink);
              eTextLink.attr('target', '_blank');
              eTextNode.append(eTextLink);
          }
      } else {
          let eTextLink = $("<span>").append(document.createTextNode("Not Availabile"));
          eTextNode.append(eTextLink);
      }

      // Display ISBN
      let identifierNode = $("<p>");
      identifierNode.addClass("text-left");
      searchInfo.append(identifierNode);
      if (this.item.volumeInfo.industryIdentifiers) {
          let identifierArray = this.item.volumeInfo.industryIdentifiers;
          for (let i = 0; i < identifierArray.length; i++) {
              let type = this.item.volumeInfo.industryIdentifiers[i].type + ": ";
              type = type.replace(/_/g, "-");
              if (type !== 'OTHER: ') {
                  let identifierSpan = $('<span>').append(type);
                  identifierNode.append(identifierSpan);
              }
              let identifier = this.item.volumeInfo.industryIdentifiers[i].identifier;
              let isbn = $("<span>").append(identifier);
              identifierNode.append(isbn);
              identifierNode.append($('<br>'));
          }
      } else {
          let isbn = $("<span>").append(document.createTextNode("Not Found"));
          identifierNode.append(isbn)
      }
      this.addbtn(searchInfo);

      return searchCard;
  }
  addbtn(searchInfo){
      let choseInfoBtn = $("<button>");
      choseInfoBtn.addClass("btn btn-light bg-btn-iinbo");
      choseInfoBtn.text('Sell One Like This');
      choseInfoBtn.click(()=> {
          hidAllUl();
          $('#FinalBookName').val(this.state.title) ;
          $('#FinalBookAuthor').val(this.state.authors);
          $('#BookPrice').val(this.state.price) ;
          card = new Card(this.item);
      });
      searchInfo.append(choseInfoBtn);
  }
}


function updateCard(card) {
    card.setT($('#FinalTopic').val());
    card.setC($('#Condition').val());
    card.setD($('#moreDescription').val());
}

window.onload=function() {
    postboard = new PostBoard([]);
    document.getElementById("sell-book-form").onsubmit=function() {
        let bookName = $('#BookName').val();
        let authorName = $('#BookAuthor').val();
        let bookUrl = getBookURL(bookName,authorName);

        hidForm1Element();
        getData(bookUrl);

        return false;

    }
    $("#final-submittion").submit(function(e) {
        e.preventDefault();
        updateCard(card);
        postboard.addToElement(card);
        postboard.render();
        hidForm2Element();
        cleanSearchBoard();
    });

    return false;

}
function cleanSearchBoard(){
    $("#search-place").empty();
}
function hidForm2Element(){
    $("#final-submittion").addClass("hid") ;
    $("#sell-book-form").removeClass("hid") ;
}

function hidForm1Element(){
//    document.getElementById("sell-book-form").innerHTML = "";
    $("#sell-book-form").addClass("hid") ;
    $("#search-place").removeClass("hid") ;
}
function hidAllUl(){
    $("#search-place").addClass("hid");
    $("#final-submittion").removeClass("hid");
}


function getBookURL(bookName,authorName){
    let newbookName = bookName.replace(/\s/g, '');
    var titleTerm = "inauthor:";

    var url = "https://www.googleapis.com/books/v1/volumes?q=" + newbookName + "+" + titleTerm + authorName;
    return url;
}
function getData(url) {
    fetch(url)
        .then(response => response.json())
        // Pass the results to the renderSearchResults
        .then(renderSearchResults)
        // Catch any of the errors
        .catch(error => console.error(error));
    return false;
}
function renderSearchResults(response){
    let items = response.items;
    if ($('.search-container').length === 0) {
        let ul = $("<ul>");
        ul.addClass('search-container');
        ul.insertAfter("#search-result");
    }
    items.forEach((item) => {
        let li = $('<li>');
        let element = new CardItem(item);
        li.append(element.render());
        $('.search-container').append(li);
    });

}
