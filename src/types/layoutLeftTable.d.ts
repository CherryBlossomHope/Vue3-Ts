export interface menuType {
    title: string,
    indexNum: string,
    icon?: string,
    path?: string,
    children?: Array<menuType>
}