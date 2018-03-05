$(function() {
  loadPage();

  function loadPage() {
    var query = {from: uname};
    $.ajax({
      url:'/query/request',
      type:'post',
      data:query,
      success: function(data, status) {
        var request = $('#request');
        var template = $('#fileTemplate');
        request.empty();
        for (var i=0; i<data.length; i++) {
          template.find('.panel-title').text('Request at '+ Date(parseInt(data[i].requestTime)));
          template.find('.tx_id').text(data[i].tx_id);
          template.find('.from').text(data[i].from);
          template.find('.to').text(data[i].to);
          template.find('.file').text(data[i].file);
          template.find('.response').text(Date(parseInt(data[i].responseTime)));
          request.append(template.html());
          template.find('.download').attr('disabled', 'false');
          template.find('.confirm').attr('disabled', 'false');
          if (data[i].responseTime == 0) {
            template.find('.download').attr('disabled', 'true');
            template.find('.confirm').attr('disabled', 'true');
          } else if (data[i].confirmationTime != 0) {
            template.find('.download').attr('disabled', 'true');
          }
        }
        $('.confirm').each(function(index, element) {
          $(this).click(function() {
            var data = {};
            data.tx_id = $(this).siblings('.tx_id').text();
            console.log(data);
            $.ajax({
              url: '/exchange',
              type: 'delete',
              data: data,
              succuss: function(data, status) {
                console.log('confirm', data.tx_id);
                $(this).attr('disabled', 'true');
              },
              error: function(data, status) {
                console.log('error', data);
              }
            });
          });
        });
      },
      error: function(data, status) {
        console.log("error", data);
      }
    });
  };


});
