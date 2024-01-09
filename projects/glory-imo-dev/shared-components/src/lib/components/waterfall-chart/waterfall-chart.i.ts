export interface IDataChart {
  title: string;
  label: string;
  total: string[];
  color: string[];
  details?: IDataChart[];
}

export interface IDataEmitChart {
  item: IDataChart;
  index: number;
}
