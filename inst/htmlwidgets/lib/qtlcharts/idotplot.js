// Generated by CoffeeScript 2.1.1
// idotplot: plot of response by category (scatterplot with categorical x)
// Karl W Broman
var idotplot;

idotplot = function(widgetdiv, data, chartOpts) {
  var axispos, chartdivid, height, horizontal, jitter, margin, mychart, nyticks, pointcolor, pointsize, pointstroke, rectcolor, ref, ref1, ref10, ref11, ref12, ref13, ref14, ref15, ref16, ref17, ref18, ref19, ref2, ref20, ref3, ref4, ref5, ref6, ref7, ref8, ref9, title, titlepos, widgetdivid, width, xcategories, xcatlabels, xlab, yNA, ylab, ylim, yticks;
  // chartOpts start
  height = (ref = chartOpts != null ? chartOpts.height : void 0) != null ? ref : 550; // height of chart in pixels
  width = (ref1 = chartOpts != null ? chartOpts.width : void 0) != null ? ref1 : 400; // width of chart in pixels
  title = (ref2 = chartOpts != null ? chartOpts.title : void 0) != null ? ref2 : ""; // title for chart
  margin = (ref3 = chartOpts != null ? chartOpts.margin : void 0) != null ? ref3 : {
    left: 60,
    top: 40,
    right: 40,
    bottom: 40,
    inner: 5 // margins in pixels (left, top, right, bottom, inner)
  };
  xlab = (ref4 = chartOpts != null ? chartOpts.xlab : void 0) != null ? ref4 : "group"; // x-axis label
  ylab = (ref5 = chartOpts != null ? chartOpts.ylab : void 0) != null ? ref5 : "response"; // y-axis label
  axispos = (ref6 = chartOpts != null ? chartOpts.axispos : void 0) != null ? ref6 : {
    xtitle: 25,
    ytitle: 30,
    xlabel: 5,
    ylabel: 5 // position of axis labels in pixels (xtitle, ytitle, xlabel, ylabel)
  };
  titlepos = (ref7 = chartOpts != null ? chartOpts.titlepos : void 0) != null ? ref7 : 20; // position of chart title in pixels
  jitter = (ref8 = chartOpts != null ? chartOpts.jitter : void 0) != null ? ref8 : "beeswarm"; // method for jittering points (beeswarm|random|none)
  ylim = (ref9 = chartOpts != null ? chartOpts.ylim : void 0) != null ? ref9 : null; // y-axis limits
  yticks = (ref10 = chartOpts != null ? chartOpts.yticks : void 0) != null ? ref10 : null; // vector of tick positions on y-axis
  nyticks = (ref11 = chartOpts != null ? chartOpts.nyticks : void 0) != null ? ref11 : 5; // no. ticks on y-axis
  rectcolor = (ref12 = chartOpts != null ? chartOpts.rectcolor : void 0) != null ? ref12 : "#E6E6E6"; // color of background rectangle
  pointcolor = (ref13 = chartOpts != null ? chartOpts.pointcolor : void 0) != null ? ref13 : null; // color for points
  pointsize = (ref14 = chartOpts != null ? chartOpts.pointsize : void 0) != null ? ref14 : 3; // size of points in pixels
  pointstroke = (ref15 = chartOpts != null ? chartOpts.pointstroke : void 0) != null ? ref15 : "black"; // color of outer circle for points
  yNA = (ref16 = chartOpts != null ? chartOpts.yNA : void 0) != null ? ref16 : {
    handle: true,
    force: false,
    width: 15,
    gap: 10 // treatment of missing values (handle=T/F, force=T/F, width, gap)
  };
  xcategories = (ref17 = chartOpts != null ? chartOpts.xcategories : void 0) != null ? ref17 : null; // group categories
  xcatlabels = (ref18 = chartOpts != null ? chartOpts.xcatlabels : void 0) != null ? ref18 : null; // labels for group categories
  horizontal = (ref19 = chartOpts != null ? chartOpts.horizontal : void 0) != null ? ref19 : false; // If true, have genotypes on vertical axis and phenotype on horizontal axis
  // chartOpts end
  chartdivid = (ref20 = chartOpts != null ? chartOpts.chartdivid : void 0) != null ? ref20 : 'chart';
  widgetdivid = d3.select(widgetdiv).attr('id');
  // make sure list args have all necessary bits
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
  yNA = d3panels.check_listarg_v_default(yNA, {
    handle: true,
    force: false,
    width: 15,
    gap: 10
  });
  mychart = d3panels.dotchart({
    height: height,
    width: width,
    margin: margin,
    xcategories: xcategories,
    xcatlabels: xcatlabels,
    xlab: xlab,
    ylab: ylab,
    xNA: {
      handle: false,
      force: false
    },
    yNA: {
      handle: yNA.handle,
      force: yNA.force
    },
    yNA_size: {
      width: yNA.width,
      gap: yNA.gap
    },
    title: title,
    axispos: axispos,
    titlepos: titlepos,
    jitter: jitter,
    ylim: ylim,
    yticks: yticks,
    nyticks: nyticks,
    rectcolor: rectcolor,
    pointcolor: pointcolor,
    pointstroke: pointstroke,
    pointsize: pointsize,
    horizontal: horizontal,
    tipclass: widgetdivid
  });
  mychart(d3.select(widgetdiv).select("svg"), data);
  // increase size of point on mouseover
  mychart.points().on("mouseover", function(d) {
    return d3.select(this).attr("r", pointsize * 3);
  }).on("mouseout", function(d) {
    return d3.select(this).attr("r", pointsize);
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
