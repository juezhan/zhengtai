let dataSourse = [
  {
    name: '品牌',
    value: 'c1',
    children: [
      {
        value: 'c1-0',
        name: '联想'
      },
      {
        value: 'c1-1',
        name: 'ThinkPad'
      },
      {
        value: 'c1-2',
        name: '戴尔'
      },
      {
        value: 'c1-3',
        name: '华硕'
      },
      {
        value: 'c1-4',
        name: '小米'
      },
      {
        value: 'c1-5',
        name: '惠普'
      }
    ]
  },
  {
    name: '便捷导购',
    value: 'c2',
    children: [
      {
        value: 'c2-0',
        name: '商务办公'
      },
      {
        value: 'c2-1',
        name: '家庭使用'
      },
      {
        value: 'c2-2',
        name: '轻薄便携'
      },
      {
        value: 'c2-3',
        name: '高清游戏'
      },
      {
        value: 'c2-4',
        name: '设计相关'
      }

    ]
  },
  {
    name: '显卡类别',
    value: 'c3',
    children: [
      {
        value: 'c3-0',
        name: '集成显卡',
      },
      {
        value: 'c3-1',
        name: '入门级游戏独立显卡',
      },
      {
        value: 'c3-2',
        name: '高性能游戏独立显卡'
      }
    ]
  },
  {
    name: '游戏性能',
    value: 'c4',
    children: [
      {
        value: 'c4-0',
        name: '吃鸡性能'
      },
      {
        value: 'c4-1',
        name: '入门级'
      },
      {
        value: 'c4-2',
        name: '发烧级'
      },
      {
        value: 'c4-3',
        name: '骨灰级'
      }
    ]
  }
];
let itemLen = 500;
let itemDate = [];

function randomFrom(lowerValue, upperValue) {
  return Math.floor(Math.random() * (upperValue - lowerValue + 1) + lowerValue);
}

function getClassName() {
  let className = [], itemTitle = [];
  for (let i in dataSourse) {
    let item = dataSourse[i];
    let chkIndex = randomFrom(0, item.children.length - 1)
    className.push(item.children[chkIndex].value)
    itemTitle.push(item.children[chkIndex].name)
  }
  return {
    itemTitle: itemTitle.join('&nbsp;'),
    className: className.join(' ')
  };
}

function getItems() {
  for (let i = 0; i < itemLen; i++) {
    let item = getClassName();
    itemDate.push(`<li class="item zhaoli ${item.className}">
                    <div class="tupian" style="background-image: url(/r/cms/zckj/zckj/imgs/tupian1.png)"></div>
                    <div class="xiawenzi">
                        <p class="biaoti">${item.itemTitle}</p>
                        <p class="mingzi"><a href="">MORE+</a></p>
                    </div>
                  </li>`);
  }

  $('#itemWrapper').html(itemDate.join(''));
}

function getSelectorItems() {
  let selectorItems = []
  for (let i in dataSourse) {
    let item = dataSourse[i];
    let itemOps = []
    for (let j in item.children) {
      itemOps.push(`<li class="item" data-value="${item.children[j].value}"><span>${item.children[j].name}</span></li>`);
    }
    selectorItems.push(`<div class="selector">
                            <div class="selector-title yiyi">${item.name}：</div>
                            <div class="selector-items">
                                <ul>
                                    <li class="item active" data-value=""><span>不限</span></li>
                                    ${itemOps.join('')}
                                </ul>
                            </div>
                        </div>`);
  }

  $('#selectorWrapper').html(selectorItems.join(''));
}

function setPageination() {
  let currentPage = 1;
  // 总记录数
  // let total = $('#itemWrapper .item:not(.hide)').length;
  let total = $('#itemWrapper .item.enable').length;
  // 每页显示数
  let pageSize = 12;
  // 总页数=（总记录数+每页显示数-1）/每页显示数
  let totalPage = Math.floor((total + pageSize - 1) / pageSize);
  $('#itemWrapper .item.enable:lt(' + pageSize + ')').addClass('active');
  // console.log('totalPage:', totalPage)
  $("#pagination2").pagination({
    currentPage: currentPage,
    totalPage: totalPage,
    isShow: false,
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

// getSelectorItems();
// getItems();
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