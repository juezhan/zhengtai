$(document).ready(function () {

    function setPageination() {
        let currentPage = 1;
        // 总记录数
        // let total = $('#itemWrapper .item:not(.hide)').length;
        let total = $('#itemWrapper .item.enable').length;
        // 每页显示数
        let pageSize = 16;
        // 总页数=（总记录数+每页显示数-1）/每页显示数
        let totalPage = Math.floor((total + pageSize - 1) / pageSize);
        $('#itemWrapper .item.enable:lt(' + pageSize + ')').addClass('active');
        // console.log('totalPage:', totalPage)
        $("#pagination2").pagination({
            currentPage: currentPage,
            totalPage: totalPage,
            // isShow: false,
            isHide: false,
            count: 5,
            prevPageText: "< 上一页",
            nextPageText: "下一页 >",
            callback: function (current) {
                $('#itemWrapper .item.enable').removeClass('active');
                if (current > 1) {
                    $('#itemWrapper .item.enable:gt(' + pageSize * (current - 1) + '):lt(' + pageSize + ')').addClass('active');
                }
                else {
                    $('#itemWrapper .item.enable:lt(' + pageSize + ')').addClass('active');
                }
            }
        });
    }


    $('#itemWrapper .item').addClass('enable');
    setPageination();
    $('#selectorWrapper').on('click', '.item', function () {
        $(this).addClass('active').siblings().removeClass('active');
        setTimeout(function () {
            let classNames = []
            $('#selectorWrapper .item.active').each(function (i, e) {
                let className = $(e).data('value');
                if (className.length > 0) {
                    classNames.push(`.${className}`);
                }
            });
            // $('#itemWrapper .item').removeClass('hide');
            $('#itemWrapper .item').removeClass('enable active');
            if (classNames.length > 0) {
                // $('#itemWrapper .item:not(' + classNames.join('') + ')').addClass('hide');
                $('#itemWrapper .item' + classNames.join('')).addClass('enable');
            } else {
                $('#itemWrapper .item').addClass('enable');
            }
            setPageination();
        }, 20);
    });
});