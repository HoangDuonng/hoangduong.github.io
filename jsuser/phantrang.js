var current_page = 1;
var pageSize = 10;
$.ajax({
    url: 'https://webgis.phuongnamdts.com/api/mqtt?topic=all&page=all',
    dataScr: 'data',
    type: 'GET',
    success: function(res){
        // console.log(res);
        var str = res.data;
        var mang = str.total;
        console.log(mang);
        
            
            $('#paging').pagination({
                
                tongSoPage: Math.ceil(mang/pageSize),
                dataSource: function(done){
                    var result = [];
                    for(var i = 1; i < mang; i++){
                        result.push(i);
                    }
                    done(result);
                },
                locator: 'data',
                totalNumberLocator: function(response) {
                    // you can return totalNumber by analyzing response content
                    return response.total;
                },
            
                afterPageOnClick: function(event, pageNumber){
                    loadPage(pageNumber)
            
                },
                afterPreviousOnClick: function(event,pageNumber){
                    loadPage(pageNumber);
                },
                afterNextOnClick: function(event,pageNumber){
                    loadPage(pageNumber);
                }
            })
        }
    }
)


function loadPage(page){
    current_page = page;
    $.ajax({
        url: 'https://webgis.phuongnamdts.com/api/mqtt?topic=all&page='+page,
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