$(document).ready(function(){
    /* to make my home screen look cool with loader */
    $('body').css('background','black');
    setTimeout(function(){
        $(".content").hide();
        $("#button").show();
        // while(1){
            setInterval(function(){
                setTimeout(function(){
                    $("#arrow1").css('visibility', 'visible'); 
                },100)
                setTimeout(function(){
                    $("#arrow1").css('visibility', 'hidden'); 
                    $("#arrow2").css('visibility', 'visible'); 
                },200)
                setTimeout(function(){
                    $("#arrow2").css('visibility', 'hidden'); 
                    $("#arrow3").css('visibility', 'visible'); 
                },300)
                $("#arrow3").css('visibility', 'hidden'); 
            },650)
        // }
      }, 1000);
      
      /*
      * @desc    : On click of button 'View Table', an ajax call is made to fetch parsed *            CSV data
      * */
      $("#parseCsv").click(function(){
        $.ajax({
            type: "GET",
            url: "/tableData",
            success: function(data){
                // Processing data to be in format of Datatables
                var dataset=[];
                data.forEach(element => {
                    var set = [];
                    for(key in element){
                        set.push(element[key]);
                    }
                    dataset.push(set);
                });
                $('body').css('background','white');
                $('.content').hide();
                $('.container').hide();
                $('#hotelsData').css('visibility','block');
                $('#hotelsData').DataTable( {
                    data: dataset,
                    columns: [  //each column can be sorted by click on them
                        { title: "Name" },
                        { title: "Address" },
                        { title: "Stars" },
                        { title: "Contact" },
                        { title: "Phone" },
                        { title: "Uri" }
                    ]
                } );
            }
          });
    });
});