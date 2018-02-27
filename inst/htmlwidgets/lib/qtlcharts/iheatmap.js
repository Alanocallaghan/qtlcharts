// Generated by CoffeeScript 2.1.1
// iheatmap: Interactive heatmap, linked to curves with the horizontal and vertical slices
// Karl W Broman
var iheatmap;

iheatmap = function(widgetdiv, data, chartOpts) {
  var axispos, cells, chartdivid, colors, flip_vert_slice, formatX, formatY, g_heatmap, g_horslice, g_verslice, hbot, height, horcurve, horslice, htop, linecolor, linewidth, margin, myheatmap, nullcolor, nxticks, nyticks, nzticks, plotHor, plotVer, rectcolor, ref, ref1, ref10, ref11, ref12, ref13, ref14, ref15, ref16, ref17, ref18, ref19, ref2, ref20, ref21, ref22, ref23, ref24, ref25, ref26, ref27, ref3, ref4, ref5, ref6, ref7, ref8, ref9, svg, title, titlepos, ver_opts, vercurve, verslice, widgetdivid, width, wleft, wright, xdif, xlab, xlim, xticks, ydif, ylab, ylim, yticks, z_transpose, zlab, zlim, zthresh, zticks;
  // chartOpts start
  height = (ref = chartOpts != null ? chartOpts.height : void 0) != null ? ref : 800; // total height of chart
  width = (ref1 = chartOpts != null ? chartOpts.width : void 0) != null ? ref1 : 800; // total width of chart
  htop = (ref2 = chartOpts != null ? chartOpts.htop : void 0) != null ? ref2 : height / 2; // height of top charts in pixels
  wleft = (ref3 = chartOpts != null ? chartOpts.wleft : void 0) != null ? ref3 : width / 2; // width of left charts in pixels
  margin = (ref4 = chartOpts != null ? chartOpts.margin : void 0) != null ? ref4 : {
    left: 60,
    top: 40,
    right: 40,
    bottom: 40,
    inner: 0 // margins in pixels (left, top, right, bottom, inner)
  };
  axispos = (ref5 = chartOpts != null ? chartOpts.axispos : void 0) != null ? ref5 : {
    xtitle: 25,
    ytitle: 30,
    xlabel: 5,
    ylabel: 5 // position of axis labels in pixels (xtitle, ytitle, xlabel, ylabel)
  };
  titlepos = (ref6 = chartOpts != null ? chartOpts.titlepos : void 0) != null ? ref6 : 20; // position of chart title in pixels
  rectcolor = (ref7 = chartOpts != null ? chartOpts.rectcolor : void 0) != null ? ref7 : "#E6E6E6"; // color of background rectangle
  nullcolor = (ref8 = chartOpts != null ? chartOpts.nullcolor : void 0) != null ? ref8 : "#E6E6E6"; // color of pixels with null values
  linecolor = (ref9 = chartOpts != null ? chartOpts.linecolor : void 0) != null ? ref9 : "slateblue"; // line color
  linewidth = (ref10 = chartOpts != null ? chartOpts.linewidth : void 0) != null ? ref10 : 2; // line width
  xlim = (ref11 = chartOpts != null ? chartOpts.xlim : void 0) != null ? ref11 : null; // x-axis limits
  ylim = (ref12 = chartOpts != null ? chartOpts.ylim : void 0) != null ? ref12 : null; // y-axis limits
  nxticks = (ref13 = chartOpts != null ? chartOpts.nxticks : void 0) != null ? ref13 : 5; // no. ticks on x-axis
  xticks = (ref14 = chartOpts != null ? chartOpts.xticks : void 0) != null ? ref14 : null; // vector of tick positions on x-axis
  nyticks = (ref15 = chartOpts != null ? chartOpts.nyticks : void 0) != null ? ref15 : 5; // no. ticks on y-axis
  yticks = (ref16 = chartOpts != null ? chartOpts.yticks : void 0) != null ? ref16 : null; // vector of tick positions on y-axis
  nzticks = (ref17 = chartOpts != null ? chartOpts.nzticks : void 0) != null ? ref17 : 5; // no. ticks on z-axis
  zticks = (ref18 = chartOpts != null ? chartOpts.zticks : void 0) != null ? ref18 : null; // vector of tick positions on z-axis
  title = (ref19 = chartOpts != null ? chartOpts.title : void 0) != null ? ref19 : ""; // title for chart
  xlab = (ref20 = chartOpts != null ? chartOpts.xlab : void 0) != null ? ref20 : "X"; // x-axis label
  ylab = (ref21 = chartOpts != null ? chartOpts.ylab : void 0) != null ? ref21 : "Y"; // y-axis label
  zlab = (ref22 = chartOpts != null ? chartOpts.zlab : void 0) != null ? ref22 : "Z"; // z-axis label
  zthresh = (ref23 = chartOpts != null ? chartOpts.zthresh : void 0) != null ? ref23 : null; // lower threshold for plotting in heat map: only values with |z| > zthresh are shown
  zlim = (ref24 = chartOpts != null ? chartOpts.zlim : void 0) != null ? ref24 : [
    -d3panels.matrixMaxAbs(data.z),
    0,
    d3panels.matrixMaxAbs(data.z) // z-axis limits
  ];
  colors = (ref25 = chartOpts != null ? chartOpts.colors : void 0) != null ? ref25 : [
    "slateblue",
    "white",
    "crimson" // heat map colors (same length as `zlim`)
  ];
  flip_vert_slice = (ref26 = chartOpts != null ? chartOpts.flip_vert_slice : void 0) != null ? ref26 : false; // if true, flip the y- and z- axes in the vertical slice
  // chartOpts end
  chartdivid = (ref27 = chartOpts != null ? chartOpts.chartdivid : void 0) != null ? ref27 : 'chart';
  widgetdivid = d3.select(widgetdiv).attr('id');
  // make sure list args have all necessary bits
  margin = d3panels.check_listarg_v_default(margin, {
    left: 60,
    top: 40,
    right: 40,
    bottom: 40,
    inner: 0
  });
  axispos = d3panels.check_listarg_v_default(axispos, {
    xtitle: 25,
    ytitle: 30,
    xlabel: 5,
    ylabel: 5
  });
  hbot = height - htop;
  wright = width - wleft;
  // Select the svg element
  svg = d3.select(widgetdiv).select("svg");
  if (xlim == null) {
    xlim = d3.extent(data.x);
    xdif = (data.x[1] - data.x[0]) / 2;
    xlim[0] -= xdif;
    xlim[1] += xdif;
  }
  if (ylim == null) {
    ylim = d3.extent(data.y);
    ydif = (data.y[1] - data.y[0]) / 2;
    ylim[0] -= ydif;
    ylim[1] += ydif;
  }
  // transpose of z matrix
  z_transpose = d3panels.transpose(data.z);
  //# configure the three charts
  myheatmap = d3panels.heatmap({
    width: wleft,
    height: htop,
    margin: margin,
    axispos: axispos,
    titlepos: titlepos,
    rectcolor: rectcolor,
    xlim: xlim,
    ylim: ylim,
    nxticks: nxticks,
    xticks: xticks,
    nyticks: nyticks,
    yticks: yticks,
    xlab: xlab,
    ylab: ylab,
    zlim: zlim,
    zthresh: zthresh,
    colors: colors,
    nullcolor: nullcolor,
    tipclass: widgetdivid
  });
  horslice = d3panels.panelframe({
    width: wleft,
    height: hbot,
    margin: margin,
    axispos: axispos,
    titlepos: titlepos,
    rectcolor: rectcolor,
    xlim: xlim,
    ylim: d3.extent(zlim),
    nxticks: nxticks,
    xticks: xticks,
    nyticks: nzticks,
    yticks: zticks,
    xlab: xlab,
    ylab: zlab
  });
  ver_opts = {
    width: wright,
    height: htop,
    margin: margin,
    axispos: axispos,
    titlepos: titlepos,
    rectcolor: rectcolor,
    xlim: ylim,
    ylim: d3.extent(zlim),
    nxticks: nyticks,
    xticks: yticks,
    nyticks: nzticks,
    yticks: zticks,
    xlab: ylab,
    ylab: zlab
  };
  if (flip_vert_slice) { // flip the vertical slice (top-right panel)
    [ver_opts.xlab, ver_opts.ylab] = [ver_opts.ylab, ver_opts.xlab];
    [ver_opts.xlim, ver_opts.ylim] = [ver_opts.ylim, ver_opts.xlim];
    [ver_opts.xticks, ver_opts.yticks] = [ver_opts.yticks, ver_opts.xticks];
    [ver_opts.nxticks, ver_opts.nyticks] = [ver_opts.nyticks, ver_opts.nxticks];
  }
  verslice = d3panels.panelframe(ver_opts);
  //# now make the actual charts
  // heatmap
  g_heatmap = svg.append("g").attr("id", "heatmap");
  myheatmap(g_heatmap, data);
  // horizontal slice (below)
  g_horslice = svg.append("g").attr("id", "horslice").attr("transform", `translate(0,${htop})`);
  horslice(g_horslice);
  // vertical slice (to the right)
  g_verslice = svg.append("g").attr("id", "verslice").attr("transform", `translate(${wleft},0)`);
  verslice(g_verslice);
  formatX = d3panels.formatAxis(data.x);
  formatY = d3panels.formatAxis(data.y);
  cells = myheatmap.cells().on("mouseover", function(d, i) {
    g_verslice.select("g.title text").text(`X = ${formatX(d.x)}`);
    g_horslice.select("g.title text").text(`Y = ${formatY(d.y)}`);
    plotVer(d.xindex);
    return plotHor(d.yindex);
  }).on("mouseout", function(d, i) {
    g_verslice.select("g.title text").text("");
    return g_horslice.select("g.title text").text("");
  });
  vercurve = null;
  horcurve = null;
  plotHor = function(j) {
    if (horcurve != null) {
      horcurve.remove();
    }
    horcurve = d3panels.add_curves({
      linecolor: linecolor,
      linewidth: linewidth
    });
    return horcurve(horslice, {
      x: [data.x],
      y: [z_transpose[j]]
    });
  };
  plotVer = function(i) {
    if (vercurve != null) {
      vercurve.remove();
    }
    vercurve = d3panels.add_curves({
      linecolor: linecolor,
      linewidth: linewidth
    });
    if (flip_vert_slice) {
      return vercurve(verslice, {
        y: [data.y],
        x: [data.z[i]]
      });
    } else {
      return vercurve(verslice, {
        x: [data.y],
        y: [data.z[i]]
      });
    }
  };
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
