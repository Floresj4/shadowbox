
var closeBtnHTML = "<button type='button' class='btn btn-danger btn-shadow-close'>Close</button>";

var overlaycss;
var defaultcss = {
    display: 'none',
    position: 'absolute'
};

var defaultoverlaycss = {
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
    overlaycss = getOverlaycss(properties);
    shadow.css(overlaycss);

    $("[shadowbox]").each((i, elem) => {
        let clazz = '.' + $(elem).attr('shadowbox');

        $(elem).css(defaultcss).hide();
        $(clazz).on('click', () => {
            shadow.toggle();

            let elemcss = Object.assign(getPosition(elem),
                { 'z-index': overlaycss['z-index'] + 1 });
            $(elem).css(elemcss)
                .toggle();
        });
    });
}

function getOverlaycss(properties) {
    let background = getOrDefault(properties, 'background', '#000');
    let opacity = getOrDefault(properties, 'opacity', '.7');
    let zIndex = getOrDefault(properties, 'z-index', 5);
    let msopacity = opacity * 100;
    return Object.assign(defaultoverlaycss, {
        'background': background,
        '-ms-filter': 'progid:DXImageTransform.Microsoft.Alpha(Opacity=' + msopacity +')',
        filter: 'alpha(opacity=' + msopacity +')',
        'opacity': opacity,
        'z-index': zIndex
    });
}

function getPosition(selector) {
    return {
        'top': ($(document).height() - $(selector).height()) / 2 + 'px',
        'left': ($(document).width() - $(selector).width()) / 2 + 'px'
    };
}
