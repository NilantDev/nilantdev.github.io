$(document).ready(function () {
    $('.quotes .card').on('click', function () {
        
        if ($(this).hasClass('alternative')) {
            $(this).removeClass('blocked');
            const altLAbel = $(this).data('alt-label');
            $('.alt-card-label').text(altLAbel);
            $('.alternative').removeClass('alternative');
        }

        if ($(this).hasClass('blocked')) {
            return;
        }

        let i = $(this).data('index');
        $(this).addClass('active');
        $(this).css('z-index', 10);

        let zIndex = 9;
        for (let index = i + 1; index <= 10; index++) {
            doPassiveCard(index, zIndex);
            zIndex--;
        }

        zIndex = 9;
        for (let index = i - 1; index >= 0; index--) {
            doPassiveCard(index, zIndex);
            zIndex--;
        }

        function doPassiveCard(index, zIndex) {
            $('.quotes .card[data-index="' + index + '"]').css('z-index', zIndex);
            $('.quotes .card[data-index="' + index + '"]').removeClass('active');
        }
    });
});
