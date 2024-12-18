export interface File {
    id: string
    name: string
    size: string
    type: "pdf" | "doc" | "sheet"
    lastOpened: string
    owner: {
      name: string
      avatar: string
    }
  }
  
  export type SortField = "name" | "lastOpened"
  export type SortOrder = "asc" | "desc"