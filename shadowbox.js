$(function(){
    console.log('ready...');
    $('.shadow-box').css('visibility', 'hidden');
    $('.shadow-content').css('visibility', 'hidden');

    $('#open-button').click(() => {

        //get shadow-content dimensions
        var height = $('.shadow-content').height();
        var width = $('.shadow-content').width();

        var docHeight = $(document).height();
        var marginTop = (docHeight - height) / 2;
        var docWidth = $(document).width();
        var marginLeft = (docWidth - width) / 2;

        $('.shadow-content').css({
            'visibility': 'visible',
            'position': 'absolute',
            'top': marginTop + 'px',
            'left': marginLeft + 'px',
            'z-index': 10,
        });

        $('.shadow-box').css({
            'visibility': 'visible',
            'position': 'absolute',
            'top': '0',
            'left': '0',
            'width': '100%',
            'height': '100%'
        });
    });
});