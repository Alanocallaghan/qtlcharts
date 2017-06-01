// Generated by CoffeeScript 1.12.6
var iplotScanone_noeff;

iplotScanone_noeff = function(widgetdiv, data, chartOpts) {
  var altrectcolor, axispos, chartdivid, chrGap, height, linecolor, linewidth, margin, mylodchart, nyticks, pointcolor, pointsize, pointstroke, rectcolor, ref, ref1, ref10, ref11, ref12, ref13, ref14, ref15, ref16, ref17, ref18, ref19, ref2, ref20, ref21, ref22, ref23, ref24, ref25, ref26, ref27, ref28, ref29, ref3, ref30, ref31, ref32, ref4, ref5, ref6, ref7, ref8, ref9, rotate_ylab, title, titlepos, widgetdivid, width, xlab, ylab, ylim, yticks;
  height = (ref = chartOpts != null ? chartOpts.height : void 0) != null ? ref : 450;
  width = (ref1 = chartOpts != null ? chartOpts.width : void 0) != null ? ref1 : 900;
  margin = (ref2 = chartOpts != null ? chartOpts.margin : void 0) != null ? ref2 : {
    left: 60,
    top: 40,
    right: 40,
    bottom: 40,
    inner: 5
  };
  axispos = (ref3 = chartOpts != null ? chartOpts.axispos : void 0) != null ? ref3 : {
    xtitle: 25,
    ytitle: 30,
    xlabel: 5,
    ylabel: 5
  };
  titlepos = (ref4 = chartOpts != null ? chartOpts.titlepos : void 0) != null ? ref4 : 20;
  ylim = (ref5 = (ref6 = chartOpts != null ? chartOpts.ylim : void 0) != null ? ref6 : chartOpts != null ? chartOpts.lod_ylim : void 0) != null ? ref5 : null;
  nyticks = (ref7 = (ref8 = chartOpts != null ? chartOpts.nyticks : void 0) != null ? ref8 : chartOpts != null ? chartOpts.lod_nyticks : void 0) != null ? ref7 : 5;
  yticks = (ref9 = (ref10 = chartOpts != null ? chartOpts.yticks : void 0) != null ? ref10 : chartOpts != null ? chartOpts.lod_yticks : void 0) != null ? ref9 : null;
  chrGap = (ref11 = chartOpts != null ? chartOpts.chrGap : void 0) != null ? ref11 : 6;
  rectcolor = (ref12 = chartOpts != null ? chartOpts.rectcolor : void 0) != null ? ref12 : "#E6E6E6";
  altrectcolor = (ref13 = chartOpts != null ? chartOpts.altrectcolor : void 0) != null ? ref13 : "#C8C8C8";
  linecolor = (ref14 = (ref15 = chartOpts != null ? chartOpts.linecolor : void 0) != null ? ref15 : chartOpts != null ? chartOpts.lod_linecolor : void 0) != null ? ref14 : "darkslateblue";
  linewidth = (ref16 = (ref17 = chartOpts != null ? chartOpts.linewidth : void 0) != null ? ref17 : chartOpts != null ? chartOpts.lod_linewidth : void 0) != null ? ref16 : 2;
  pointcolor = (ref18 = (ref19 = chartOpts != null ? chartOpts.pointcolor : void 0) != null ? ref19 : chartOpts != null ? chartOpts.lod_pointcolor : void 0) != null ? ref18 : "#E9CFEC";
  pointsize = (ref20 = (ref21 = chartOpts != null ? chartOpts.pointsize : void 0) != null ? ref21 : chartOpts != null ? chartOpts.lod_pointsize : void 0) != null ? ref20 : 0;
  pointstroke = (ref22 = (ref23 = chartOpts != null ? chartOpts.pointstroke : void 0) != null ? ref23 : chartOpts != null ? chartOpts.lod_pointstroke : void 0) != null ? ref22 : "black";
  title = (ref24 = (ref25 = chartOpts != null ? chartOpts.title : void 0) != null ? ref25 : chartOpts != null ? chartOpts.lod_title : void 0) != null ? ref24 : "";
  xlab = (ref26 = (ref27 = chartOpts != null ? chartOpts.xlab : void 0) != null ? ref27 : chartOpts != null ? chartOpts.lod_xlab : void 0) != null ? ref26 : null;
  ylab = (ref28 = (ref29 = chartOpts != null ? chartOpts.ylab : void 0) != null ? ref29 : chartOpts != null ? chartOpts.lod_ylab : void 0) != null ? ref28 : "LOD score";
  rotate_ylab = (ref30 = (ref31 = chartOpts != null ? chartOpts.rotate_ylab : void 0) != null ? ref31 : chartOpts != null ? chartOpts.lod_rotate_ylab : void 0) != null ? ref30 : null;
  chartdivid = (ref32 = chartOpts != null ? chartOpts.chartdivid : void 0) != null ? ref32 : 'chart';
  widgetdivid = d3.select(widgetdiv).attr('id');
  margin = d3panels.check_listarg_v_default(margin, {
    left: 60,
    top: 40,
    right: 40,
    bottom: 40,
    inner: 5
  });
  axispos = d3panels.check_listarg_v_default(axispos, {
    xtitle: 25,
    ytitle: 30,
    xlabel: 5,
    ylabel: 5
  });
  mylodchart = d3panels.lodchart({
    height: height,
    width: width,
    margin: margin,
    axispos: axispos,
    titlepos: titlepos,
    ylim: ylim,
    nyticks: nyticks,
    yticks: yticks,
    chrGap: chrGap,
    rectcolor: rectcolor,
    altrectcolor: altrectcolor,
    linecolor: linecolor,
    linewidth: linewidth,
    pointcolor: pointcolor,
    pointsize: pointsize,
    pointstroke: pointstroke,
    title: title,
    xlab: xlab,
    ylab: ylab,
    rotate_ylab: rotate_ylab,
    tipclass: widgetdivid
  });
  mylodchart(d3.select(widgetdiv).select("svg"), data);
  mylodchart.markerSelect().on("click", function(d) {
    var r;
    r = d3.select(this).attr("r");
    return d3.select(this).transition().duration(500).attr("r", r * 3).transition().duration(500).attr("r", r);
  });
  if (chartOpts.heading != null) {
    d3.select("div#htmlwidget_container").insert("h2", ":first-child").html(chartOpts.heading).style("font-family", "sans-serif");
  }
  if (chartOpts.caption != null) {
    d3.select("body").append("p").attr("class", "caption").html(chartOpts.caption);
  }
  if (chartOpts.footer != null) {
    return d3.select("body").append("div").html(chartOpts.footer).style("font-family", "sans-serif");
  }
};
