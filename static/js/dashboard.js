$(function(){
			$.ajax({
        			url: '/getAllWords',
					type: 'GET',
			        success:function(response) {
					console.log(response);
					var data = JSON.parse(response);
					var itemsPerRow = 0;
					var div = $('<div>').attr('class','row');
					for(var i=0;i<data.length;i++){
						console.log(data[i].Title);
						if(itemsPerRow<3){
							console.log(i);
							if(i==data.length-1){
								div.append(CreateThumb(data[i].Id,data[i].Title,data[i].Description,data[i].FilePath));
								$('.well').append(div);
							}
							else{
							div.append(CreateThumb(data[i].Id,data[i].Title,data[i].Description,data[i].FilePath));
							itemsPerRow++;
							}
						}
						else{
							$('.well').append(div);
							div = $('<div>').attr('class','row');
							div.append(CreateThumb(data[i].Id,data[i].Title,data[i].Description,data[i].FilePath));
							if(i==data.length-1){
								$('.well').append(div);
							}
							itemsPerRow = 0;
						}
					}
			        },
			        error:function(error){
			        	console.log(error);
			        }
    			});

			$(document).on('click','[id^="btn_"]',function(){
				var spId = $(this).attr('id').split('_')[1];
				$.ajax({
					url: '/addUpdateLike',
					method: 'POST',
					data: {wish:$(this).attr('id').split('_')[1],like:1},
					success: function(response){
						console.log(response);
					},
					error: function(error){
						console.log(error);
					}
				});
			});
		})
		function CreateThumb(id,title,desc,filepath,like){
			var mainDiv = $('<div>').attr('class','col-sm-4 col-md-4');
			var thumbNail = $('<div>').attr('class','thumbnail');
			var img = $('<img>').attr({'src':filepath,'data-holder-rendered':true,'style':'height: 150px; width: 150px; display: block'});
			var caption = $('<div>').attr('class','caption');
			var title = $('<h3>').text(title);
			var desc = $('<p>').text(desc);
			

			var p = $('<p>');
			var btn = $('<button>').attr({'id':'btn_'+id,'type':'button','class':'btn btn-danger btn-sm'});
			var span = $('<span>').attr({'class':'glyphicon glyphicon-thumbs-up','aria-hidden':'true'});
			
			p.append(btn.append(span));
			
			
			
			caption.append(title);
			caption.append(desc);
			caption.append(p);

			thumbNail.append(img);
			thumbNail.append(caption);
			mainDiv.append(thumbNail);
			return mainDiv;

			
		}