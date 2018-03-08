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

    $shadowBox.css(overlay());

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
        let css = Object.assign(
            position(properties.display),
            { 'z-index': zIndex }
        );

        $shadowContent.css(css).show();

        //attach dynamic click event
        $('body').on('click', properties.display + ' > .btn-shadow-close', () => {
            $shadowBox.hide();
            $shadowContent.hide();
            $('body > .shadow-box').remove();
        });

        $(window).resize(()=> {
            $shadowContent.css(position(properties.display));
        });
    });
}

function overlay() {
    return overlay = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        'z-index': 5,
        'background-color': '#000',
        '-ms-filter':"progid:DXImageTransform.Microsoft.Alpha(Opacity=70)";
        filter: 'alpha(opacity=70)',
        opacity: 0.7
    };
}

function position(selector) {
    return css = {
        'top': ($(document).height() - $(selector).height()) / 2 + 'px',
        'left': ($(document).width() - $(selector).width()) / 2 + 'px'
    }
}