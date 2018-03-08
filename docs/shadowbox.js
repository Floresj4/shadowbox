var $shadowContent;
var $shadowBox;
var $shadowCloseBtn;

var closeBtnHTML = "<button type='button' class='btn btn-danger btn-shadow-close'>Close</button>";
var shadowBoxHtml = "<div class='shadow-box'></div>";

function shadowbox(properties) {

    //initialize selectors
    $shadowContent = $(properties.display);
    $shadowBox = $('.shadow-box');
    $shadowCloseBtn = $('.btn-shadow-close');

    //attach click event
    $(properties.click).click(() => {

        //append shadowbox container
        $('body').append(shadowBoxHtml);

        //make sure to not add duplicates
        if($(properties.display + " > .btn-shadow-close").length == 0) {
            $shadowContent.append(closeBtnHTML);
        }

        //get shadow-content dimensions
        var zIndex = 10;
        let css = Object.assign(getSelectorPosition(properties.display),
            { 'z-index': zIndex });

        $shadowContent.css(css).show();

        //attach dynamic click event
        $('body').on('click', properties.display + ' > .btn-shadow-close', () => {
            $shadowBox.hide();
            $shadowContent.hide();
            $('body > .shadow-box').remove();
        });

        let data = 'data';
        $(window).resize(()=> {
            $shadowContent.css(getSelectorPosition(properties.display));
        });
    });
}

function getSelectorPosition(selector) {
    return css = {
        'top': ($(document).height() - $(selector).height()) / 2 + 'px',
        'left': ($(document).width() - $(selector).width()) / 2 + 'px'
    }
}