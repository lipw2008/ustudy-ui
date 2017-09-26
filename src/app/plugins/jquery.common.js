//加入收藏夹
function AddFavorite(title, url) {
    try {
        window.external.addFavorite(url, title);
    } catch(e) {
        try {
            window.sidebar.addPanel(title, url, "");
        } catch(e) {
            alert("抱歉，您所使用的浏览器无法完成此操作。\n\n加入收藏失败，请使用Ctrl+D进行添加");
        }
    }
}
//获取相对路径
function getPath(){
	var pathName = document.location.pathname;
	var index = pathName.substr(1).indexOf("/");
	var result = pathName.substr(0,index+1);
	return result;
}
//导航菜单
$(function () {
	//菜单
	var navigation = [{
        "catID": "1",
        "icon": "caret",
        "catName": "信息中心",
        "catLink": "../informationCenter/school.html",
        "child": [
            {
                "catID": "1",
                "icon": "glyphicon-minus",
                "catName": "学校信息",
        		"catLink": "../informationCenter/school.html",
                "parentCatID": "1",
            	"child": []
            },
            {
                "catID": "2",
                "icon": "glyphicon-minus",
                "catName": "教师信息",
        		"catLink": "../informationCenter/teacher.html",
                "parentCatID": "1",
            	"child": []
            },
            {
                "catID": "3",
                "icon": "glyphicon-minus",
                "catName": "学生信息",
        		"catLink": "../informationCenter/student.html",
                "parentCatID": "1",
            	"child": []
            },
            {
                "catID": "4",
                "icon": "glyphicon-minus",
                "catName": "考试信息",
        		"catLink": "../informationCenter/exam.html",
                "parentCatID": "1",
            	"child": []
            }
        ]
    },
    {
        "catID": "2",
        "icon": "caret",
        "catName": "考试中心",
        "catLink": "../examinationCenter/school.html",
        "child": [
            {
                "catID": "1",
                "icon": "glyphicon-minus",
                "catName": "答案设置",
        		"catLink": "../examinationCenter/answerSetting.html",
                "parentCatID": "2",
            	"child": []
            },
            {
                "catID": "2",
                "icon": "glyphicon-minus",
                "catName": "任务分配",
        		"catLink": "../examinationCenter/taskAllocation.html",
                "parentCatID": "2",
            	"child": []
            },
            {
                "catID": "3",
                "icon": "glyphicon-minus",
                "catName": "线上阅卷",
        		"catLink": "../examinationCenter/OnlineMarkingTask.html",
                "parentCatID": "2",
            	"child": []
            }
        ]
    },
    {
        "catID": "3",
        "icon": "caret",
        "catName": "数据中心",
        "catLink": "../dataCenter/school.html",
        "child": [
            {
                "catID": "1",
                "icon": "glyphicon-minus",
                "catName": "阅卷统计",
        		"catLink": "../dataCenter/markingProgress.html",
                "parentCatID": "3",
            	"child": []
            },
            {
                "catID": "2",
                "icon": "glyphicon-minus",
                "catName": "试题分析",
        		"catLink": "../dataCenter/itemAnalysis.html",
                "parentCatID": "3",
            	"child": []
            },
            {
                "catID": "3",
                "icon": "glyphicon-minus",
                "catName": "成绩统计",
        		"catLink": "../dataCenter/classAchievement.html",
                "parentCatID": "3",
            	"child": []
            },
            {
                "catID": "4",
                "icon": "glyphicon-minus",
                "catName": "报表下载",
        		"catLink": "../dataCenter/reportDownload.html",
                "parentCatID": "3",
            	"child": []
            }
        ]
    },
    {
        "catID": "4",
        "icon": "caret",
        "catName": "下载中心",
        "catLink": "../downloadCenter/school.html",
        "child": []
    },
    {
        "catID": "5",
        "icon": "caret",
        "catName": "其他应用",
        "catLink": "../downloadCenter/school.html",
        "child": [
            {
                "catID": "1",
                "icon": "glyphicon-minus",
                "catName": "修改密码",
        		"catLink": "../other/school.html",
                "parentCatID": "5",
            	"child": []
            },
            {
                "catID": "2",
                "icon": "glyphicon-minus",
                "catName": "即时通讯",
        		"catLink": "../other/school.html",
                "parentCatID": "5",
            	"child": []
            },
            {
                "catID": "3",
                "icon": "glyphicon-minus",
                "catName": "信息导入",
        		"catLink": "../other/school.html",
                "parentCatID": "5",
            	"child": []
            },
            {
                "catID": "4",
                "icon": "glyphicon-minus",
                "catName": "报表参数设置",
        		"catLink": "../other/school.html",
                "parentCatID": "5",
            	"child": []
            },
            {
                "catID": "5",
                "icon": "glyphicon-minus",
                "catName": "在线编辑考号",
        		"catLink": "../other/school.html",
                "parentCatID": "5",
            	"child": []
            },
            {
                "catID": "6",
                "icon": "glyphicon-minus",
                "catName": "在线制作答题卡",
        		"catLink": "../other/school.html",
                "parentCatID": "5",
            	"child": []
            },
            {
                "catID": "7",
                "icon": "glyphicon-minus",
                "catName": "在线打印条码",
        		"catLink": "../other/school.html",
                "parentCatID": "5",
            	"child": []
            },
            {
                "catID": "8",
                "icon": "glyphicon-minus",
                "catName": "蘑菇云云盘",
        		"catLink": "../other/school.html",
                "parentCatID": "5",
            	"child": []
            }
        ]
    }];
	//解析菜单
    function tree(data) {
        for (var i = 0; i < data.length; i++) {
            var data2 = data[i];
            if (data2.icon == "caret") {
                $("#navigation").append(
                	"<li data-name='" + data2.catID + "' class='dropdown'>" +
                	"<a href='" + data2.catLink + "' data-toggle='dropdown' role='button' aria-haspopup='true' aria-expanded='false'>" +
                	data2.catName +
        			"&nbsp;<span class='"+ data2.icon +"'></span>" +
                	"</a>" +
                	"</li>");
                	//console.log($("li").children("ul").length);
            } else {
                var children = $("li").children("ul");
                  if (children.length == 0) {
                      $("li").append("<ul></ul>")
                  }
                $("li > ul").append(
                    "<li data-name='" + data2.catID + "'>" +
                    "<a href='" + data2.catLink + "'>" + data2.catName + "</a>" +
                    "</li>")
            }
            for (var j = 0; j < data2.child.length; j++) {
                var child = data2.child[j];
                var children = $("li[data-name='" + child.parentCatID + "']").children("ul");
                if (children.length == 0) {
                    $("li[data-name='" + child.parentCatID + "']").append("<ul class='dropdown-menu' aria-labelledby='dLabel'></ul>")
                }
                $("li[data-name='" + child.parentCatID + "'] > ul").append(
                    "<li data-name='" + child.catID + "'>" +
                    "<a href='" + child.catLink + "'>" + child.catName + "</a>" +
                    "</li>")
                var child2 = data2.child[j].child;
                tree(child2)
            }
            tree(data2);
        }
    }
    //写入菜单
    tree(navigation);
});