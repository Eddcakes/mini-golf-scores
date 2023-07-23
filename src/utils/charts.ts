import { ScaleLinear, scaleLinear } from "d3";

export type XScale = ScaleLinear<number, number>;
export type YScale = ScaleLinear<number, number>;

export const getXScale = (min: number, max: number, width: number): XScale =>
  scaleLinear().domain([min, max]).range([0, width]);

export const getYScale = (min: number, max: number, height: number): YScale =>
  scaleLinear().domain([max, min]).range([0, height]);
