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
        var height = $shadowContent.height();
        var width = $shadowContent.width();
        var zIndex = 10;
        var docHeight = $(document).height();
        var margintop = (docHeight - height) / 2 + 'px';
        var docWidth = $(document).width();
        var marginleft = (docWidth - width) / 2 + 'px';

        $shadowContent.css({
            'top': margintop,
            'left': marginleft ,
            'z-index': zIndex,
        }).show();

        //attach dynamic click event
        $('body').on('click', properties.display + ' > .btn-shadow-close', () => {
            $shadowBox.hide();
            $shadowContent.hide();
            $('body > .shadow-box').remove();
        });
    });
}