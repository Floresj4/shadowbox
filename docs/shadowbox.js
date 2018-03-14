var $shadowContent;
var $shadowBox;
var $shadowCloseBtn;

var closeBtnHTML = "<button type='button' class='btn btn-danger btn-shadow-close'>Close</button>";
var shadowBoxHtml = "<div class='shadow-box'></div>";

function getOrDefault(properties, propertyToFind, defaultValue) {
    return (properties !== undefined)
        ? (properties.hasOwnProperty(propertyToFind)
            ? properties[propertyToFind] : defaultValue)
                : defaultValue;
}

function collectShadowElements() {
    let elements = [];
    $("[shadowbox]").each((i, elem) => {
        let clazz = '.' + $(elem).attr('shadowbox');

        $(elem).hide();
        $(clazz).on('click', () => {
            $(elem).toggle();
        });
    });

    return elements;
}
function shadowbox(properties) {
    //append shadowbox container
    if(!exists('shadow-box')) {
        $('body').append(shadowBoxHtml);
    }

    var shadowElements = collectShadowElements();

    //initialize selectors
    $shadowContent = $(properties.display);
    $shadowBox = $('.shadow-box');
    $shadowCloseBtn = $('.btn-shadow-close');

    let overlayCss = overlay(properties);
    $shadowBox.css(overlayCss);

    //attach click event
    $(properties.click).click(() => {

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
        $shadowBox.show();

        //attach dynamic click event
        $('body').on('click', properties.display + ' > .btn-shadow-close', () => {
            $shadowBox.hide();
            $shadowContent.hide();
        });

        $(window).resize(()=> {
            $shadowContent.css(position(properties.display));
        });
    });
}

function exists(selector) {
    return $(selector).length == 0;
}

function position(selector) {
    return css = {
        'top': ($(document).height() - $(selector).height()) / 2 + 'px',
        'left': ($(document).width() - $(selector).width()) / 2 + 'px'
    }
}

function overlay(properties) {
    let background = getOrDefault(properties, 'background', '#000');
    let zIndex = getOrDefault(properties, 'z-index', 5);
    let opacity = getOrDefault(properties, 'opacity', .7);
    let msOpacity = (opacity * 100);

    return {
        '-ms-filter': 'progid:DXImageTransform.Microsoft.Alpha(Opacity=' + msOpacity +')',
        filter: 'alpha(opacity=' + msOpacity +')',
        'z-index': zIndex,
        'background': background,
        opacity: opacity,
        display: 'none',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
    };
}