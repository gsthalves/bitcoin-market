import crypto from "node:crypto";

export type EntityProps = {
  id?: string | null | undefined;
  createdAt?: Date | null | undefined;
  updatedAt?: Date | null | undefined;
};

export abstract class Entity<T extends EntityProps> {
  constructor(protected readonly props: T) {}

  get id(): string {
    return this.props.id || crypto.randomUUID();
  }

  get createdAt(): Date {
    return this.props.createdAt || new Date();
  }

  get updatedAt(): Date {
    return this.props.updatedAt || new Date();
  }
}
