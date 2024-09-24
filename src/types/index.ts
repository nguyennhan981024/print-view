export interface DocumentType {
  id: number;
  data: string[];
}
export interface DocumentPayloadType {
  document: string,
  numberOfItems?: number | null,
  isLoopOver?: boolean,
  isAutoImportNumber?: boolean
}
