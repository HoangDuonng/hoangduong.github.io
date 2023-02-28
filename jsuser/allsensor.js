$(document).ready(function(){
    var selectedValue;
    getSelectValue(selectedValue);
});

function getSelectValue(){
    var selectedValue = document.getElementById("format").value;
    // console.log(selectedValue);
    loatData(selectedValue);
}

function loatData(selectedValue){
    // console.log(selectedValue);
    var topicUrl;
    switch(selectedValue) {
        case "allsensor":
            topicUrl = 'https://webgis.phuongnamdts.com/api/mqtt?topic=all&page=all';
            break;
        case "temperature":
            topicUrl = 'https://webgis.phuongnamdts.com/api/mqtt?topic=nhiet%20do';
            break;
        case "humidity":
            topicUrl = 'https://webgis.phuongnamdts.com/api/mqtt?topic=do%20am';
            break;
        case "salinity":
            topicUrl = 'https://webgis.phuongnamdts.com/api/mqtt?topic=do%20man';
            break;
        }
    $.ajax({
        url: topicUrl,
        dataScr: 'data',
        type: 'GET',
        success: function(res){
            // console.log(res);
            var str = res.data;
            var mang = str.data;
        if (mang.length == 0) {
            $(".addListCamBien").html("<tr><td colspan=4>Không tìm thấy dữ liệu</td></tr>");
        }
        else {
            var body = '';
            console.log(mang);
            for (var i in mang) {
                var oj = mang[i];
                
                body = body + '<tr>' +
                    '<td>' + (parseInt(i) + 1) + '</td>' +
                    '<td>' + oj.device + '</td>' +
                    '<td class="text-danger"> ' + oj.topic + ' </td>' +
                    '<td>' + oj.value + '</td>' +
                    '<td>' + oj.created_at + '</td>' +
                    // '<td>' + oj.last_page+ '</td>' +
                    '</tr>';
               }
               $('#addListCamBien').html(body);
            }
        }
    })
}


