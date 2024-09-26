import { Entity, EntityProps } from "@/domain/entities";

export type BitcoinHistoryEntityProps = {
  date: Date;
  high: number;
  low: number;
  vol: number;
  last: number;
  buy: number;
  sell: number;
  open: number;
} & EntityProps;

export class BitcoinHistoryEntity extends Entity<BitcoinHistoryEntityProps> {
  constructor(protected readonly props: BitcoinHistoryEntityProps) {
    super(props);
  }

  get date(): Date {
    return this.props.date;
  }

  get high(): number {
    return this.props.high;
  }

  get low(): number {
    return this.props.low;
  }

  get vol(): number {
    return this.props.vol;
  }

  get last(): number {
    return this.props.last;
  }

  get buy(): number {
    return this.props.buy;
  }

  get sell(): number {
    return this.props.sell;
  }

  get open(): number {
    return this.props.open;
  }
}
