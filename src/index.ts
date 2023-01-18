import { users, products, purchase } from "./database";
import express, { Request, Response } from 'express';
import {TUser, TProduct, TPurchase } from "./types"
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong! Jessiquikita linda, CONTINUE A NADAR!!!')
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


app.get("/products/:id",(req: Request, res: Response)=>{
    const id =req.params.id
    const result = products.find((product)=>{
        return product.id === id
    })
    res.status(200).send(result)
})


app.get("/users/:id/purchases", (req: Request, res: Response) => {

    try {
        const id = req.params.id
        const purchaseIndex = purchase.find((purchase) => purchase.userId === id)

        if (purchaseIndex) {
            res.status(200).send(purchaseIndex)
        } else {
            res.status(400)
            throw new Error("Esse usuário não fez compras!")
        }
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }

})



app.delete("/users/:id",(req: Request, res: Response)=>{
    const id = req.params.id
    const userIndex = users.findIndex((user)=>{
        return user.id === id
    })
    if(userIndex >=0) {
        users.splice(userIndex, 1)
        res.status(200).send("User apagado com sucesso!")
        }else{res.status(404).send("Item não encontrado!")
    }
})


app.delete("/products/:id",(req: Request, res: Response)=>{
    const id = req.params.id
    const productIndex = products.findIndex((product)=>{
        return product.id === id
    })
    if(productIndex >=0) {
        products.splice(productIndex, 1)
        res.status(200).send("product apagado com sucesso!")
        }else{res.status(404).send("Item não encontrado!")
    }
})


app.put("/users/:id",(req: Request, res: Response)=>{
const id = req.params.id

const newEmail=req.body.email as string | undefined
const newPassword=req.body.password as string | undefined

const user = users.find((user)=>{
    return user.id===id
})
if(user){
    user.email= newEmail || user.email
    user.password=newPassword || user.password
}
res.status(200).send("Cadastro atualizado com sucesso")
})


app.put("/products/:id",(req: Request, res: Response)=>{
    const id = req.params.id
    
    const newName=req.body.name as string | undefined
    const newPrice=req.body.price as number | undefined
    const newCategory=req.body.category as string | undefined

    const product = products.find((product)=>{
        return product.id===id
    })
    if(product){
        product.name= newName || product.name
        product.price=newPrice || product.price
        product.category=newCategory || product.category

    }
    res.status(200).send("Produto atualizado com sucesso")
    })
