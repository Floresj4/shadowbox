
var shadow;
var active;
var closeable;
var offset = 15;
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

function shadowbox(properties) {

    $('body').append("<div class='shadow-overlay'></div>");
    shadow = $('.shadow-overlay');
    overlaycss = getOverlaycss(properties);
    shadow.css(overlaycss);

    $("[shadowbox]").each((i, elem) => {
        let clazz = '.' + $(elem).attr('shadowbox');

        $(elem).css(defaultcss).hide();
        $(clazz).on('click', () => {
            active = elem;
            shadow.toggle();
            $(elem).css(Object.assign(getCenterPosition(elem),
                { 'z-index': overlaycss['z-index'] + 1 }))
                .toggle();

            if(closeable === undefined) {
                $('body').append("<span class='shadow-close'>x</span>");
                closeable = $('.shadow-close');

                $('body').on('click', '.shadow-close', () => close());
            }

            closeable.css(Object.assign(defaultcss,
                getClosePosition(elem)))
                .toggle();
        });
    });

    $(window).resize(()=> {
        if(active !== undefined) {
            $(active).css(getCenterPosition(active));
            $(closeable).css(getClosePosition(active));
        }
    });
}

function close() {
    $(active).toggle();
    $(shadow).toggle();
    $(closeable).toggle();
    active = null;
}

function getOrDefault(properties, propertyToFind, defaultValue) {
    return (properties !== undefined)
        ? (properties.hasOwnProperty(propertyToFind)
            ? properties[propertyToFind] : defaultValue)
        : defaultValue;
}

function getOverlaycss(properties) {
    let background = getOrDefault(properties, 'background', '#000');
    let opacity = getOrDefault(properties, 'opacity', '.7');
    let zIndex = getOrDefault(properties, 'z-index', 5);
    let msopacity = opacity * 100;
    return Object.assign(defaultoverlaycss, {
        'background': background,
        '-ms-filter': 'progid:DXImageTransform.Microsoft.Alpha(Opacity=' + msopacity +')',
        'filter': 'alpha(opacity=' + msopacity +')',
        'opacity': opacity,
        'z-index': zIndex
    });
}

function getCenterPosition(selector) {
    return {
        'top': ($(document).height() - $(selector).outerHeight()) / 2 + 'px',
        'left': ($(document).width() - $(selector).outerWidth()) / 2 + 'px'
    };
}

function getClosePosition(selector) {
    let pos = {
        'top': ($(active).position().top) + 'px',
        'left': ($(active).position().left + $(active).outerWidth()) + 'px'
    };

    console.log('selector: ' + selector + '\n' +
        'css-height: ' + $(selector).css('height') + '\n' +
        'height: ' + $(selector).height() + '\n' +
        'outer-height: ' +  $(selector).outerHeight() + '\n' +
        'document-height: ' +  $(document).height() + '\n' +
        'document-outer-height: ' +  $(document).outerHeight() + '\n' +
        'selector-left: ' +  $(selector).position().left + '\n' +
        'selector-top: ' +  $(selector).position().top + '\n' +
        'active-top: ' + $(active).position().top + '\n' +
        'width: ' +  $(selector).css('width'));

    return pos;
}