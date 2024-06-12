export type MiaodaExtension = {
    id: string,
    name: string;
    version: string;
    description: string;
}
export const registerMiaoda = (extInfo: MiaodaExtension) => {
    console.log(JSON.stringify(extInfo, null, 2))
}