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
        {x: null}

    ## https://github.com/Alanocallaghan/d3heatmap/blob/master/inst/htmlwidgets/d3heatmap.js
    renderValue: (widgetdiv, x, instance) ->
        this.doRenderValue(widgetdiv, x, instance)

    doRenderValue: (widgetdiv, x, instance) ->

        instance.x = x
        
        svg = d3.select(widgetdiv).select("svg")

        # clear svg and remove tool tips
        svg.selectAll("*").remove()
        widgetid = d3.select(widgetdiv).attr('id')
        d3.selectAll("div.d3-tip.#{widgetid}").remove()

        chartOpts = x.chartOpts ? [ ]
        width = chartOpts?.width ? widgetdiv.clientWidth
        height = chartOpts?.height ? widgetdiv.clientHeight

        svg.attr("width", width)
        svg.attr("height", height)

        iboxplot(widgetdiv, x.data, chartOpts)

    resize: (widgetdiv, width, height, instance) ->
        if (instance.x) 
            this.doRenderValue(widgetdiv, instance.x, instance)

})
