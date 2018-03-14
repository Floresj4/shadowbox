var $shadowContent;
var $shadowBox;
var $shadowCloseBtn;

var closeBtnHTML = "<button type='button' class='btn btn-danger btn-shadow-close'>Close</button>";
var shadowOverlay = "<div class='shadow-overlay'></div>";

var defaultcss = {
    display: 'none',
    position: 'absolute'
};

function getOrDefault(properties, propertyToFind, defaultValue) {
    return (properties !== undefined)
        ? (properties.hasOwnProperty(propertyToFind)
            ? properties[propertyToFind] : defaultValue)
                : defaultValue;
}

function shadowbox(properties) {
    //append shadowbox container
    if(!exists('.shadow-overlay')) {
        $('body').append(shadowOverlay);
    }

    $("[shadowbox]").each((i, elem) => {
        let clazz = '.' + $(elem).attr('shadowbox');

        $(elem).css(defaultcss).hide();
        $(clazz).on('click', () => {
            $(elem).css(position(elem)).toggle();
        });
    });
}

function exists(selector) {
    return $(selector).length != 0;
}

function position(selector) {
    return {
        'top': ($(document).height() - $(selector).height()) / 2 + 'px',
        'left': ($(document).width() - $(selector).width()) / 2 + 'px'
    };
}
