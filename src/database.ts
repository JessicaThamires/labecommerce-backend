import { TUser, TProduct, TPurchase } from "./types"

export const users: TUser[] = [{
    id: "00",
    email: "chevet@gmail.com",
    password: "chevet00"
},{
    id: "01",
    email: "corsa@gmail.com",
    password: "corsa01"
},{
    id: "02",
    email: "celtaa@gmail.com",
    password: "celta02"
}]

enum CATEGORYCAR {
AESTHETICS="Estética",
CLEANING="Limpeza",
ACCESSORIES = "Acessórios"
}


export const products: TProduct[] = [{
    id:"00",
    name:"Lavagem simples",
    price: 30,
    category: CATEGORYCAR.CLEANING
},{
    id:"01",
    name:"Lavagem com cera",
    price: 40,
    category: CATEGORYCAR.CLEANING
},
{
    id:"03",
    name:"Cristalização",
    price: 120,
    category: CATEGORYCAR.AESTHETICS
}]


export const purchase: TPurchase[] = [{
    userId: "00",
    productId: "01",
    quantity: 1,
    totalPrice: 40
}]
