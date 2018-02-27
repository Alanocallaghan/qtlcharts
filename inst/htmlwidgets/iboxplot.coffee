# iboxplot: many boxplots linked to histogram for each
# Karl W Broman

HTMLWidgets.widget({

    name: "iboxplot",
    type: "output",

    initialize: (widgetdiv, width, height) ->
        d3.select(widgetdiv).append("svg")
          .attr("width", width)
          .attr("height", height)
          .attr("class", "qtlcharts")

    ## https://github.com/Alanocallaghan/d3heatmap/blob/master/inst/htmlwidgets/d3heatmap.js
    renderValue: (widgetdiv, x, instance) ->
        this.doRenderValue(widgetdiv, x, instance)

    doRenderValue: (widgetdiv, x, instance) ->

        instance.lastValue = x;

        svg = d3.select(widgetdiv).select("svg")

        # clear svg and remove tool tips
        svg.selectAll("*").remove()
        widgetid = d3.select(widgetdiv).attr('id')
        d3.selectAll("div.d3-tip.#{widgetid}").remove()

        chartOpts = x.chartOpts ? [ ]
        chartOpts.width = chartOpts?.width ? svg.attr("width")
        chartOpts.height = chartOpts?.height ? svg.attr("height")

        svg.attr("width", chartOpts.width)
        svg.attr("height", chartOpts.height)

        iboxplot(widgetdiv, x.data, chartOpts)

    resize: (el, width, height, instance) ->
        if (instance.lastValue) 
            this.doRenderValue(el, instance.lastValue, instance)

})
