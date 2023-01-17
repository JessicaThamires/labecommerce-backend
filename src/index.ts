import { users, products, purchase } from "./database";
import express, { request, Request, Response } from 'express';
import {TUser, TProduct, TPurchase } from "./types"
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong! Jessiquikita linda, CONTINUE A NADAR!')
})


app.get("/users", (req: Request, res: Response) => {
    res.status(200).send(users)
})

app.get("/products", (req: Request, res: Response) => {
    res.status(200).send(products)
})

app.get("/product/search", (req: Request, res: Response) => {
    const q = req.query.q as string

    const result = products.filter((product) => {
        return product.name.toLowerCase().includes(q.toLowerCase())
    })
    res.status(200).send(result)
})

app.post("/users", (req: Request, res: Response) => {
    const { id, email, password } = req.body as TUser

    const newUser = {
        id,
        email,
        password
    }
    users.push(newUser)
    res.status(201).send("Cadastro realizado com sucesso")
})

app.post("/products", (req: Request, res: Response) => {
    const {  id,    name,    price,    category } = req.body as TProduct

    const newProduct = {
        id,
        name,
        price,
        category,
    }
    products.push(newProduct)
    res.status(201).send("Produto cadastrado com sucesso")
})

app.post("/purchase", (req: Request, res: Response) => {
    const {  userId,    productId,    quantity,    totalPrice} = req.body as TPurchase
    const newPurchase= {
        userId,
        productId,
        quantity,
        totalPrice
    }
    purchase.push(newPurchase)
    res.status(201).send("Compra realizada com sucesso")
})


console.log(users)
console.log(products)
console.log(purchase)