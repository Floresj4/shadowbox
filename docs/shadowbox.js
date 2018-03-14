var $shadowContent;
var $shadowBox;
var $shadowCloseBtn;

var closeBtnHTML = "<button type='button' class='btn btn-danger btn-shadow-close'>Close</button>";

var defaultcss = {
    display: 'none',
    position: 'absolute'
};

var overlaycss = {
    display: 'none',
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0
};

function getOrDefault(properties, propertyToFind, defaultValue) {
    return (properties !== undefined)
        ? (properties.hasOwnProperty(propertyToFind)
            ? properties[propertyToFind] : defaultValue)
                : defaultValue;
}

function shadowbox(properties) {

    $('body').append("<div class='shadow-overlay'></div>");
    let shadow = $('.shadow-overlay');
    shadow.css(overlaycss);

    $("[shadowbox]").each((i, elem) => {
        let clazz = '.' + $(elem).attr('shadowbox');

        $(elem).css(defaultcss).hide();
        $(clazz).on('click', () => {

            shadow.toggle();

            $(elem).css(position(elem)).toggle();
        });
    });
}

function position(selector) {
    return {
        'top': ($(document).height() - $(selector).height()) / 2 + 'px',
        'left': ($(document).width() - $(selector).width()) / 2 + 'px'
    };
}
