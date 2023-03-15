export interface menuType {
    title: string,
    indexCode: string,
    icon?: string,
    path?: string,
    children?: Array<menuType>
}