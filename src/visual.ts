/*
*  Power BI Visual CLI
*
*  Copyright (c) Microsoft Corporation
*  All rights reserved.
*  MIT License
*
*  Permission is hereby granted, free of charge, to any person obtaining a copy
*  of this software and associated documentation files (the ""Software""), to deal
*  in the Software without restriction, including without limitation the rights
*  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
*  copies of the Software, and to permit persons to whom the Software is
*  furnished to do so, subject to the following conditions:
*
*  The above copyright notice and this permission notice shall be included in
*  all copies or substantial portions of the Software.
*
*  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
*  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
*  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
*  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
*  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
*  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
*  THE SOFTWARE.
*/
"use strict";
import "core-js/stable";
import "./../style/visual.less";
import powerbi from "powerbi-visuals-api";
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import VisualObjectInstanceEnumeration = powerbi.VisualObjectInstanceEnumeration;
import IVisual = powerbi.extensibility.visual.IVisual;
import IVisualHost = powerbi.extensibility.IVisualHost;
import EnumerateVisualObjectInstancesOptions = powerbi.EnumerateVisualObjectInstancesOptions;
import VisualObjectInstance = powerbi.VisualObjectInstance;
import DataView = powerbi.DataView;
import VisualObjectInstanceEnumerationObject = powerbi.VisualObjectInstanceEnumerationObject;
import * as d3 from "d3";


import { VisualSettings } from "./settings";


export class Visual implements IVisual {
    private host: IVisualHost;
    private svg: d3.Selection<SVGElement>;
    private container: d3.Selection<SVGElement>;
    private circle: d3.Selection<SVGElement>;
    private textValue: d3.Selection<SVGElement>;
    private textLabel: d3.Selection<SVGElement>;
    private visualSettings: VisualSettings;
    private bgColor : d3.Selection<SVGAElement>;

    constructor(options: VisualConstructorOptions) {
        
        this.svg = d3.select(options.element)
            .append('svg')
            .classed('circleCard', true);
        this.container = this.svg.append("g")
            .classed('container', true);
        this.circle = this.container.append("circle")
            .classed('circle', true);
        this.textValue = this.container.append("text")
            .classed("textValue", true);
        this.textLabel = this.container.append("text")
            .classed("textLabel", true);

        this.bgColor =   d3.select("body");
        
    }


    public enumerateObjectInstances(
        options: EnumerateVisualObjectInstancesOptions
    ): VisualObjectInstance[] | VisualObjectInstanceEnumerationObject {

        return VisualSettings.enumerateObjectInstances(this.visualSettings || VisualSettings.getDefault(), options);
    }
    /*
    public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstanceEnumeration {
        const settings: VisualSettings = this.visualSettings ||
            VisualSettings.getDefault() as VisualSettings;
        return VisualSettings.enumerateObjectInstances(settings, options);
    }*/

    public update(options: VisualUpdateOptions) {
        let dataView: DataView = options.dataViews[0];
        let width: number = options.viewport.width;
        let height: number = options.viewport.height;
        this.svg.attr({
            width: width,
            height: height
        });
        let radius: number = Math.min(width, height) / 2.2;
        

        this.visualSettings = VisualSettings.parse(dataView) as VisualSettings;
        //this.visualSettings = VisualSettings.parse<VisualSettings>(dataView);
        this.visualSettings.circle.backgroundColor = this.visualSettings.circle.backgroundColor;

        this.visualSettings.circle.circleThickness = Math.max(0, this.visualSettings.circle.circleThickness);

        this.visualSettings.circle.circleThickness = Math.min(10, this.visualSettings.circle.circleThickness);
        
        //this.bgColor.style("background-color", this.visualSettings.circle.backgroundColor);   
        this.bgColor.transition()
        .duration(2000)
        .style("background-color", this.visualSettings.circle.backgroundColor);

        
        this.circle
            .style("fill", this.visualSettings.circle.circleColor)
            .style("fill-opacity", 0.5)
            .style("stroke", "black")
            .style("stroke-width", this.visualSettings.circle.circleThickness)
            .attr({
                r: radius,
                cx: width / 2,
                cy: height / 2
            });
        let fontSizeValue: number = Math.min(width, height) / 12;
        this.textValue
            .text(dataView.single.value as string)
            .attr({
                x: "50%",
                y: "50%",
                dy: "0.35em",
                "text-anchor": "middle"
            }).style("font-size", fontSizeValue + "px");
        let fontSizeLabel: number = fontSizeValue / 4;
        this.textLabel
            .text(dataView.metadata.columns[0].displayName)
            .attr({
                x: "50%",
                y: height / 2,                                 
                dy: fontSizeValue / 0.8,
                "text-anchor": "middle"
            })
            .style("font-size", fontSizeLabel+12 + "px");
    }




}
