$(document).ready(() => {

    let submitData = {};


    //日期格式化
    const dateFtt = (fmt, date) => { //author: meizz
        const o = {
            "M+" : date.getMonth()+1,                 //月份
            "d+" : date.getDate(),                    //日
            "h+" : date.getHours(),                   //小时
            "m+" : date.getMinutes(),                 //分
            "s+" : date.getSeconds(),                 //秒
            "q+" : Math.floor((date.getMonth()+3)/3), //季度
            "S"  : date.getMilliseconds()             //毫秒
        };
        if(/(y+)/.test(fmt))
            fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
        for(let k in o)
            if(new RegExp("("+ k +")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        return fmt;
    };


    function getBeforeMonth(d){
        d = new Date(d);
        d = +d - 1000*60*60*24*29;
        d = new Date(d);
        var year = d.getFullYear();
        var mon = d.getMonth() + 1;
        var day = d.getDate();
        s = year+"-"+(mon < 10 ? ('0'+mon):mon)+"-"+(day<10?('0'+day):day);
        return s;
    }

    let Today = dateFtt("yyyy-MM-dd", new Date());
    let Yesterday = dateFtt("yyyy-MM-dd", new Date(new Date().getTime() - 24*60*60*1000));
    let Yesterday1 = dateFtt("yyyy-MM", new Date(new Date().getTime() - 24*60*60*1000));

    const NewDate = Yesterday.split("-");
    const month = NewDate[1][0] === "0" ? NewDate[1][1] : NewDate[1];
    const day = NewDate[2][0] === "0" ? NewDate[2][1] : NewDate[2];

    const lastDate = getBeforeMonth(Today);

    const newLastDate = lastDate.split("-");
    const lastMonth = newLastDate[1][0] === "0" ? newLastDate[1][1] : newLastDate[1];
    const lastDay = newLastDate[2][0] === "0" ? newLastDate[2][1] : newLastDate[2];




    console.log("NewDate",month)

    //表格初始化筛选日期
    $("#oldDate").html(`${month}.${day}-${month}.${day}`);
    $("#newDate").html(`${lastMonth}.${lastDay}-${lastMonth}.${lastDay}`);


    let dataTal = [
        {
            id: 'check-1',
            name: '711',
            type: 'store-1',
            value: 123,
        },
        {
            id: 'check-2',
            name: '红旗连锁',
            type: 'store-2',
            value: 1213,
        },
        {
            id: 'check-3',
            name: '舞东风',
            type: 'store-3',
            value: 1223,
        },
        {
            id: 'check-4',
            name: 'iPhone专卖店',
            type: 'store-4',
            value: 1243,
        },
        {
            id: 'check-5',
            name: '三星专卖店',
            type: 'store-5',
            value: 1213,
        }, {
            id: 'check-6',
            name: '华为专卖店',
            type: 'store-6',
            value: 1213
        }, {
            id: 'check-7',
            name: '耐克',
            type: 'store-7',
            value: 1213
        }, {
            id: 'check-8',
            name: '金六福',
            type: 'store-8',
            value: 1213
        }, {
            id: 'check-9',
            name: '老坛酸菜牛老坛酸菜牛肉面肉面',
            type: 'store-9',
            value: 1213
        }, {
            id: 'check-10',
            name: '功夫熊猫',
            type: 'store-10',
            value: 1213
        }, {
            id: 'check-11',
            name: '守望先锋',
            type: 'store-11',
            value: 1213
        }
    ];

    //排序点击切换

    $(".table-head").on("click", ".Date-th", (e) => {
        // const divEle = $(".table-head").find(".Date-th");
        if($(e.target).hasClass("minus")){
            $(e.target).removeClass("minus").addClass("active");
            $(e.target).siblings(".Date-th").removeClass("active").removeClass("minus");
        }else {
            $(e.target).addClass("minus").removeClass("active");
            $(e.target).siblings(".Date-th").removeClass("active").removeClass("minus");
        }
    });

    /**滚动加载*/


    let isFinished = false; //是否数据加载完毕
    let list = 20; // 每页显示数量

    //分页数据结果
    const htmlStrTable = `<li>
                        <div class="list-col total-td">031</div>
                        <div class="list-col store-td"><div class="store-text">海鲜自助海</div></div>
                        <div class="list-col Date-td">12,254,213.00</div>
                        <div class="list-col Date-td">12,254,213.00</div>
                        <div class="list-col percent-td">154%</div>
                    </li>
                    <li>
                        <div class="list-col total-td">031</div>
                        <div class="list-col store-td"><div class="store-text">海鲜自助海</div></div>
                        <div class="list-col Date-td">12,254,213.00</div>
                        <div class="list-col Date-td">12,254,213.00</div>
                        <div class="list-col percent-td">154%</div>
                    </li>
                    <li>
                        <div class="list-col total-td">031</div>
                        <div class="list-col store-td"><div class="store-text">海鲜自助海</div></div>
                        <div class="list-col Date-td">12,254,213.00</div>
                        <div class="list-col Date-td">12,254,213.00</div>
                        <div class="list-col percent-td">154%</div>
                    </li>
                    <li>
                        <div class="list-col total-td">031</div>
                        <div class="list-col store-td"><div class="store-text">海鲜自助海</div></div>
                        <div class="list-col Date-td">12,254,213.00</div>
                        <div class="list-col Date-td">12,254,213.00</div>
                        <div class="list-col percent-td">154%</div>
                    </li>
                    <li>
                        <div class="list-col total-td">031</div>
                        <div class="list-col store-td"><div class="store-text">海鲜自助海</div></div>
                        <div class="list-col Date-td">12,254,213.00</div>
                        <div class="list-col Date-td">12,254,213.00</div>
                        <div class="list-col percent-td">154%</div>
                    </li>`;

    var falg = true;
    // dropload
    var dropload = $('.table-list').dropload({
        domDown : {
            domClass   : 'dropload-down',
            domRefresh : '<div class="dropload-refresh">↑上拉加载更多</div>',
            domLoad    : '<div class="dropload-load"><span class="loading"></span><span class="loading-text">加载中...</span></div>',
            domNoData  : '<div class="dropload-noData">暂无数据</div>'
        },
        distance: 50,
        loadDownFn : function(me){
            if(!falg){
                return;
            }
                $.ajax({
                    type: 'GET',
                    url: './more.json',
                    dataType: 'json',
                    beforeSend: function() {
                        console.log(1212)
                        falg = false
                    },
                    success: function(data){
                        var result = '';
                        for(var i = 0; i < data.lists.length; i++){
                            result += '<li>'
                                +'<div class="list-col total-td">12</div>'
                                +'<div class="list-col store-td"><span class="store-text">' + data.lists[i].title + '</span></div>'
                                +'<div class="list-col Date-td">'+data.lists[i].date+'</div>'
                                +'<div class="list-col Date-td">'+data.lists[i].date+'</div>'
                                +'<div class="list-col percent-td">'+ '154%' +'</div>'
                                +'</li>';

                            if((i + 1) >= data.lists.length){
                                // 锁定
                                dropload.lock();
                                // 无数据
                                dropload.noData();
                                break;
                            }
                        }
                        // 为了测试，延迟1秒加载
                        setTimeout(function(){
                            $("#table-main").append(result);
                            falg = true
                            // 每次数据加载完，必须重置
                            dropload.resetload();
                        },1000);
                    },
                    error: function(xhr, type){
                        alert('Ajax error!');
                        // 即使加载出错，也得重置
                        dropload.resetload();
                    }
                });


        }
    });


    /**日期选择*/

    /**统计日期*/


    $.selectDateSimple("#datetime-picker-start", {
        start:1900,
        end: 2099,
        select: Yesterday1.split("-"),
        title:'请选择统计开始日期'
    },function (data) {
        $("#countDateStart").val(`${data.year}-${data.month}-${data.day}`);
    });




    $.selectDateSimple("#datetime-picker-end", {
        start:1980,
        end: 2099,
        // select: Yesterday.split("-"),
        title:'请选择统计截止日期',
        ensureBtnText: '哈哈哈'
    },function (data) {
        $("#countDateEnd").val(`${data.year}-${data.month}-${data.day}`);
    });

    /**对比日期*/

    console.warn("Yesterday.split(\"-\")", Yesterday.split("-"))
    console.warn("对比日期", lastDate.split("-"))

    $.selectDate("#compar-date-start",{
        start:1980,
        end: 2099,
        select: lastDate.split("-"),
        title:'请选择对比开始日期'
    },function (data) {
        $("#compareDateStart").val(`${data.year}-${data.month}-${data.day}`);
    });

    $.selectDate("#compar-date-end",{
        start:1900,
        end: 2099,
        select: lastDate.split("-"),
        title:'请选择对比截止日期'
    },function (data) {
        $("#compareDateEnd").val(`${data.year}-${data.month}-${data.day}`);
    });

    //格式化日期
    const formatDate = (date) => {
        if(date){
            const NewDate = date.split("-");
            return `${NewDate[0]}年 ${NewDate[1]}月 ${NewDate[2]}日`
        }
        return ''
    }

    //初始数据渲染 （之前选择了，重新点击修改再选）
    const initRender = (obj = {}) => {

        console.warn("obj:============", obj)
        Today = obj.compareDate || dateFtt("yyyy-MM-dd", new Date());
        Yesterday = obj.countDate;


        /**这里有更改（03-14）*/
        $("#datetime-picker-start").html(formatDate(obj.countDateStart));
        $("#datetime-picker-end").html(formatDate(obj.countDateEnd));
        $("#countDateStart").val(obj.countDateStart);
        $("#countDateEnd").val(obj.countDateEnd);

        $("#compar-date-start").html(formatDate(obj.compareDateStart));
        $("#compar-date-end").html(formatDate(obj.compareDateEnd));

        $("#compareDateStart").val(obj.compareDateStart);
        $("#compareDateEnd").val(obj.compareDateEnd);

        if(obj.store === "all"){
            $("#all").attr("checked", true);
        }else if(obj.store === "single"){
            $("#single").attr("checked", true);
            $("#single-store").show();
            let res = []
            dataTal.map(ele => {
                for(i in obj){
                    if(ele.type === i){
                        res.push(ele);
                    }
                }
            });

            let noselect = fliterData(dataTal, res);

            //未选择
            let htmlstr1 = noselect.length !== 0 ? noselect.map(ele => {
                return "<div class='store-list'>" +
                            "<div class='store-list-inner'>" +
                                "<input class='magic-radio' type='checkbox' name='"+ ele.type +"' id='"+ ele.id +"'>" +
                                "<label for='"+ ele.id +"'>"+ ele.name +"</label>" +
                            "</div>" +
                        "</div>"
            }): "<div class='nodata'>暂无数据</div>";

            //已选中
            let htmlstr = res.length !== 0 ? res.map(ele => {
                return '<div class="store-list">' +
                            '<div class="store-list-inner">' +
                                '<input class="magic-radio" type="checkbox" checked name="'+ ele.type +'" id="'+ ele.id +'">' +
                                '<label for="'+ ele.id +'">'+ ele.name +'</label>' +
                            '</div>' +
                        '</div>'
            }) : '<div class="nodata">暂无数据</div>'

            // store-Selected

            $("#store-Selected").html(htmlstr)
            $("#store-unSelected").html(htmlstr1)
        }
    };

    //筛选
    const fliterData = (old, obj) => {
        let initData = [];
        for(let i = 0; i < old.length; i++){
            const obj1 = old[i];
            const num = obj1.id;
            let isExist = false;
            for(let j = 0; j < obj.length; j++){
                const n = obj[j].id;
                if(n === num){
                    isExist = true;
                    break;
                }
            }
            if(!isExist){
                initData.push(obj1);
            }
        }
        return initData
    }

    //根据数据渲染html
    const renderHtml = (data) => {
        if(data.length !== 0){
            let htmlstr = data.map(function(ele) {
                return "<div class=\"store-list\">\n" +
                    "                        <div class=\"store-list-inner\">\n" +
                    "                            <input class=\"magic-radio\" type=\"checkbox\" name='"+ ele.type +"' id='"+ ele.id +"'>" +
                    "                            <label for='"+ ele.id +"'>"+ ele.name +"</label>\n" +
                    "                        </div>\n" +
                    "                    </div>"
            })
            $("#store-unSelected").html(htmlstr);
        }else {
            $("#store-unSelected").html("<div class='nodata'>暂无数据</div>");
        }
    }

    const fuzzyQuery = (list, keyWord) => {
        let arr = [];
        for (let i = 0; i < list.length; i++) {
            if (list[i].name.indexOf(keyWord) >= 0) {
                arr.push(list[i]);
            }
        }
        return arr;
    };

    const isEmpty = (ele) => {
        const len = $(ele).children().length;
        if(len === 0){
            $(ele).html("<div class='nodata'>暂无数据</div>")
        }else {
            $(ele).find(".nodata").remove()
        }
    }

    /**这里有更改（03-14）*/
    //初始化赋值
    initRender({
        compareDateEnd: `${newLastDate[0]}-${lastMonth}-${lastDay}`,
        compareDateStart: `${newLastDate[0]}-${lastMonth}-${lastDay}`,
        countDateEnd: `${NewDate[0]}-${month}-${day}`,
        countDateStart: `${NewDate[0]}-${month}-${day}`,
        store: 'all',
    })



    /**
     * 点击头部显示搜索面板
     *
     * */
    $(".select-flex").on("click", () => {
        //打开搜索面板
        $(".search-container").show();

        //渲染数据
        $("#single-store").hide();//隐藏店铺选择
        renderHtml(dataTal);
        console.log("submitData",submitData)

        if(submitData.countDateStart !== undefined){
            console.log("赋值：",submitData)
            initRender(submitData)
        }

    })

    //点击未选中店铺切换
    $("#store-unSelected").on("click", "label", (e) => {
        const currentHtml = $(e.target).parents(".store-list");
        $("#store-Selected").append(currentHtml);
        const len = $("#store-unSelected").children().length;
        isEmpty("#store-Selected")
        isEmpty("#store-unSelected")

    });
    //点击选中店铺切换
    $("#store-Selected").on("click", "label", (e) => {
        const currentHtml = $(e.target).parents(".store-list");
        const currentName = $(e.target).html();
        $("#store-unSelected").append(currentHtml);

        isEmpty("#store-Selected");
        isEmpty("#store-unSelected");

        const Ele = $("#store-Selected").find(".store-list");//已存在选中的

        $("#searchInput").val("");//输入框清空

        let initData = [];
        for(let i = 0; i < dataTal.length; i++){
            const obj = dataTal[i];
            const num = obj.name;
            let isExist = false;
            for(let j = 0; j < Ele.length; j++){
                const n = $(Ele[j]).find("label").text();
                if(n === num){
                    isExist = true;
                    break;
                }
            }
            if(!isExist){
                initData.push(obj);
            }
        }
        renderHtml(initData)//渲染
    });


    //输入框输入搜索
    $("#searchInput").bind('input propertychange', (e) => {
        const Val = $(e.target).val();
        //检测是否存在已选中的
        const Ele = $("#store-Selected").find(".store-list");
        console.log("检测是否存在已选中的", Ele.length)
        if(Ele.length === 0){
            renderHtml(fuzzyQuery(dataTal, Val))
        }else {
            let initData = [];
            for(let i = 0; i < dataTal.length; i++){
                const obj = dataTal[i];
                const num = obj.name;
                let isExist = false;
                for(let j = 0; j < Ele.length; j++){
                    const n = $(Ele[j]).find("label").text();
                    if(n === num){
                        isExist = true;
                        break;
                    }
                }
                if(!isExist){
                    initData.push(obj);
                }
            }
            console.warn("initData",initData)
            renderHtml(fuzzyQuery(initData, Val))
        }
    })



    //切换店铺（全部店铺和部分店铺）
    $(".check_label").on("click", "label", (e) => {
        const Target = $(e.target).html();
        if(Target === "部分店铺"){
            $("#single-store").show()
        }else {
            $("#single-store").hide()
        }
    })

    //重置操作
    $("#reset").on("click", () => {
        const NewDate = Yesterday.split("-");
        const month = NewDate[1][0] === "0" ? NewDate[1][1] : NewDate[1];
        const day = NewDate[2][0] === "0" ? NewDate[2][1] : NewDate[2];

        $("#datetime-picker-start").html(`${NewDate[0]}年 ${month}月 ${day}日`);
        $("#countDate").val(`${NewDate[0]}-${month}-${day}`);
        $("#compar-date").html('');
        $("#compareDate").val('');

        const divShow = $(".check_label").children(".check_label_list");

        $(divShow[0]).find(".magic-radio").attr("checked", true);

        $("#single-store").hide()
        $("#store-Selected").html("<div class=\"nodata\">暂无数据</div>");

        renderHtml(dataTal);
    })


    /**格式化日期，首页缩略显示*/

    function formateDateIndex(d) {
        if(d){
            const NewDate = d.split("-");
            return `${NewDate[1]}.${NewDate[2]}`
        }
        return ''
    }

    //显示店铺名称
    function chooseStoreName(d){
        if(d){
            if(d === 'all'){
                return '全部店铺'
            }else if(d === 'all1'){
                return '联营店铺'
            }else if(d === 'all2'){
                return '租赁店铺'
            }else {
                return '部分店铺'
            }
        }
    }

    //提交按钮
    $("#sure").on("click", (e) => {
        e.preventDefault()
        var d = {};
        var t = $('#searchForm').serializeArray();
        $.each(t, function() {
            d[this.name] = this.value;
        });
        console.log(d)
        let initData = [];
        for(let i in d){
            initData.push(i);
        }



        if(!d.countDateStart || !d.countDateEnd){
            layer.open({
                content: '请选择对比日期'
                ,skin: 'msg'
                ,time: 2 //2秒后自动关闭
            });
        }else if(d.store === 'single' && initData.length === 3){
            layer.open({
                content: '还未选择店铺'
                ,skin: 'msg'
                ,time: 2 //2秒后自动关闭
            });
        }else {
            submitData = d; //存入

            $("#oldDate").html(formateDateIndex(d.countDateStart)+'-'+formateDateIndex(d.countDateEnd));
            $("#newDate").html(formateDateIndex(d.compareDateStart)+'-'+formateDateIndex(d.compareDateEnd));
            $("#store-type").html(chooseStoreName(d.store));
            $(".search-container").hide();
        }
    })
})
