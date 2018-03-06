var $shadowContent;
var $shadowBox;
var $shadowCloseBtn;

var closeBtnHTML = "<button type='button' class='btn btn-danger btn-shadow-close'>Close</button>";

function shadowbox(selector) {

    //initialize selectors
    $shadowContent = $('.shadow-content');
    $shadowBox = $('.shadow-box');
    $shadowCloseBtn = $('.btn-shadow-close');

    //attach click event
    $(selector).click(() => {

        $shadowContent.append(closeBtnHTML);

        //get shadow-content dimensions
        var height = $shadowContent.height();
        var width = $shadowContent.width();
        var zIndex = 10;
        var docHeight = $(document).height();
        var margintop = (docHeight - height) / 2 + 'px';
        var docWidth = $(document).width();
        var marginleft = (docWidth - width) / 2 + 'px';

        $shadowBox.show();
        $shadowContent.css({
            'top': margintop,
            'left': marginleft ,
            'z-index': zIndex,
        }).show();

        $('body').on('click', '.btn-shadow-close', () => {
            $shadowBox.hide();
            $shadowContent.hide();
        });
    });
}