//=======FOR DONUT CHART USING JQUERY :https://www.jqueryscript.net/chart-graph/Dynamic-Donut-Pie-Chart-Plugin-with-jQuery-D3-js-donut-pie-chart-js.html
var Piechart = function(options){
    this.options = options;
    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.colors = options.colors;

    this.draw = function(){
        var total_value = 0;
        var color_index = 0;
        for (var categ in this.options.data){
            var val = this.options.data[categ];
            total_value += val;
        }

        if (this.options.pos == 1){
            if (this.options.legend){
                color_index = 0;
                var legendHTML = "";
                for (categ in this.options.data){
                    legendHTML += "<div><span style='display:inline-block;width:20px;float:left;background-color:"+this.colors[color_index++]+";'>&nbsp;</span> "+categ+"</div>";
                }
                this.options.legend.innerHTML = legendHTML;
            }
        }

        else{
          if (this.options.legend){
              color_index = 0;
              var legendHTML = "";
              for (categ in this.options.data){
                  legendHTML += "<div><span style='display:inline-block;width:20px;float:right;background-color:"+this.colors[color_index++]+";'>&nbsp;</span> "+categ+"</div>";
              }
              this.options.legend.innerHTML = legendHTML;
          }
        }

        var start_angle = 0;
        for (categ in this.options.data){
            val = this.options.data[categ];
            var slice_angle = 2 * Math.PI * val / total_value;

            drawPieSlice(
                this.ctx,
                this.canvas.width/2,
                this.canvas.height/2,
                Math.min(this.canvas.width/2,this.canvas.height/2),
                start_angle,
                start_angle+slice_angle,
                this.colors[color_index%this.colors.length]
            );

            start_angle += slice_angle;
            color_index++;
        }

        //drawing a white circle over the chart
        //to create the doughnut chart
        if (this.options.doughnutHoleSize){
            drawPieSlice(
                this.ctx,
                this.canvas.width/2,
                this.canvas.height/2,
                this.options.doughnutHoleSize * Math.min(this.canvas.width/2,this.canvas.height/2),
                0,
                2 * Math.PI,
                "#FFF"
            );
        }

        start_angle = 0;
        for (categ in this.options.data){
            val = this.options.data[categ];
            slice_angle = 2 * Math.PI * val / total_value;
            var pieRadius = Math.min(this.canvas.width/2,this.canvas.height/2);
            var labelX = this.canvas.width/2 + (pieRadius / 2) * Math.cos(start_angle + slice_angle/2);
            var labelY = this.canvas.height/2 + (pieRadius / 2) * Math.sin(start_angle + slice_angle/2);

            if (this.options.doughnutHoleSize){
                var offset = (pieRadius * this.options.doughnutHoleSize ) / 2;
                labelX = this.canvas.width/2 + (offset + pieRadius / 2) * Math.cos(start_angle + slice_angle/2);
                labelY = this.canvas.height/2 + (offset + pieRadius / 2) * Math.sin(start_angle + slice_angle/2);
            }

            var labelText = Math.round(100 * val / total_value);
            if(this.options.pos == 0)
            {this.ctx.fillStyle = "black";}
            else{this.ctx.fillStyle = "white";}
            this.ctx.font = "bold 12px Arial";
            this.ctx.fillText(labelText+"%", labelX,labelY);
            start_angle += slice_angle;
        }

    }
}

function drawPieSlice(ctx,centerX, centerY, radius, startAngle, endAngle, color ){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(centerX,centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fill();
}

function plot_chart(pos1,pos2,pos3,pos4,neg1,neg2,neg3,neg4){

  var myLegend1 = document.getElementById("myLegend1");
  var myLegend2 = document.getElementById("myLegend2");

  var myVinyls = {
      "Screen": pos1,
      "Shipping": pos2,
      "Camera": pos3,
      "Battery": pos4
  };

  var myVinyls2 = {
      "Screen": neg1,
      "Shipping": neg2,
      "Camera": neg3,
      "Battery": neg4
  };

  var myDougnutChart = new Piechart(
      {
          canvas:myCanvas,
          data:myVinyls,
          colors:["#4dff4d","#f16e23", "#57d9ff","#6666ff"],
          doughnutHoleSize:0.5,
          legend:myLegend1,
          pos:0
      }
  );

  var myDougnutChart2 = new Piechart(
      {
          canvas:myCanvas2,
          data:myVinyls2,
          colors:["#e3c502","#000033", "#800000","#660066"],
          doughnutHoleSize:0.5,
          legend:myLegend2,
          pos:1
      }
  );

  myDougnutChart.draw();
  myDougnutChart2.draw();

}

//plot_chart(10,10,10,10,10,20,20,10);
