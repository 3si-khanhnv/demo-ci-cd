
/**
 * @prop {string | number} id - for entity id of ngrx store
 */
export interface NgrxEntity {
  id: string | number;
}

export interface BulkDataObject<T> {
  totalCount: number;
  items: T;
}
