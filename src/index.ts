import { users, products, purchase } from "./database";
import express, { Request, Response } from 'express';
import { TUser, TProduct, TPurchase } from "./types"
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
    try {
        res.status(200).send(users)
    } catch (error) {

        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }


})

app.get("/products", (req: Request, res: Response) => {

    try {
        res.status(200).send(products)
    } catch (error: any) {

        console.log(error.any)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

app.get("/product/search", (req: Request, res: Response) => {
    try {
        const q = req.query.q as string
        const result = products.filter((product) =>{
            return product.name.toLowerCase().includes(q.toLowerCase())
        })
        if(q !== undefined){
        if (q.length < 1) {
            res.status(400)
            throw new Error("Escreva algo na pesquisa")
        }
    }

    if (result.length < 1) {
        res.status(404)
        throw new Error("Produto não encontrado")
    } 
     res.status(200).send(result)

} catch (error) {

    console.log(error)
    if (res.statusCode === 200) {
        res.status(500)
    }
    if (error instanceof Error) {
        res.send(error.message)
    } else {
        res.send("Erro inesperado")
    }
}
})

app.post("/users", (req: Request, res: Response) => {
    try {
        const { id, email, password } = req.body as TUser

    const newUser = {
        id,
        email,
        password
    }

if(typeof id !== "string"){
    res.status(400)
throw new Error ( "Este campo é permitido apenas letras")
}

if(typeof email !== "string"){
    res.status(400)
throw new Error ( "'Email' é permitido apenas letras")
}

if(typeof password !== "string"){
    res.status(400)
throw new Error ( "'Password' é permitido apenas letras")
}

if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)){
    throw new Error ("Formato de email inválido.")
}
if(id !== newUser.id){
    res.status(201).send('Cadastro realizado com sucesso.')
    users.push(newUser)
}else{
    res.status(400)
    throw new Error("'id'usuário já existe. Insira nova id.")
}

if(email !== newUser.email){
    res.status(201).send("Cadastro realizado com sucesso.")
    users.push(newUser)
}else{
    res.status(400)
    throw new Error("Email já existe em nosso cadastro, Tente outro e-mail.")
}

    users.push(newUser)
    res.status(201).send("Cadastro realizado com sucesso")

} catch (error) {

    console.log(error)
    if (res.statusCode === 200) {
        res.status(500)
    }
    if (error instanceof Error) {
        res.send(error.message)
    } else {
        res.send("Erro inesperado")
    }
}

})

app.post("/products", (req: Request, res: Response) => {

try {
        const { id, name, price, category } = req.body as TProduct

    const newProduct = {
        id,
        name,
        price,
        category,
    }
    products.push(newProduct)
    res.status(201).send("Produto cadastrado com sucesso")

} catch (error) {

    console.log(error)
    if (res.statusCode === 200) {
        res.status(500)
    }
    if (error instanceof Error) {
        res.send(error.message)
    } else {
        res.send("Erro inesperado")
    }
}


     // IMPLEMENTAR Create Product
// validar o body
// extra:
// não deve ser possível criar mais de um produto com a mesma id
 })



app.post("/purchase", (req: Request, res: Response) => {
    try {
         const { userId, productId, quantity, totalPrice } = req.body as TPurchase
    const newPurchase = {
        userId,
        productId,
        quantity,
        totalPrice
    }
    purchase.push(newPurchase)
    res.status(201).send("Compra realizada com sucesso")

} catch (error) {

    console.log(error)
    if (res.statusCode === 200) {
        res.status(500)
    }
    if (error instanceof Error) {
        res.send(error.message)
    } else {
        res.send("Erro inesperado")
    }
}


   
//     Create Purchase
// validar o body
// extra:
// id do usuário que fez a compra deve existir no array de usuários cadastrados
// id do produto que foi comprado deve existir no array de produtos cadastrados
// a quantidade e o total da compra devem estar com o cálculo correto
})


app.get("/products/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const result = products.find((product) => product.id === id)
        if (!result) {
            res.status(404)
            throw new Error("Conta não encontrada. Verifique a 'id'.")
        }
        res.status(200).send(result)
    } catch (error) {

        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }

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
    } catch (error) {

        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }


})



app.delete("/users/:id", (req: Request, res: Response) => {

    try {

    } catch (error) {

    }
    const id = req.params.id
    const userIndex = users.findIndex((user) => {
        return user.id === id
    })
    if (userIndex >= 0) {
        users.splice(userIndex, 1)
        res.status(200).send("User apagado com sucesso!")
    } else {
        res.status(404).send("Item não encontrado!")
    }
})


app.delete("/products/:id", (req: Request, res: Response) => {

    try {
        const id = req.params.id
        const productIndex = products.findIndex((product) => product.id === id)

        if (productIndex >= 0) {
            products.splice(productIndex, 1)
            res.status(200).send("product deletado com sucesso.")
        } else {
            res.status(404).send("Item não existe.")
        }
    } catch (error) {

        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }


})

app.put("/users/:id", (req: Request, res: Response) => {

    try {
        const id = req.params.id

        const newEmail = req.body.email as string | undefined
        const newPassword = req.body.password as string | undefined

        const user = users.find((user) => user.id === id)
        if (user) {
            user.email = newEmail || user.email
            user.password = newPassword || user.password
        }
        res.status(200).send("Cadastro atualizado com sucesso")



    } catch (error) {

        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }

})

app.put("/products/:id", (req: Request, res: Response) => {
    const id = req.params.id

    const newName = req.body.name as string | undefined
    const newPrice = req.body.price as number | undefined
    const newCategory = req.body.category as string | undefined

    const product = products.find((product) => {
        return product.id === id
    })
    if (product) {
        product.name = newName || product.name
        product.price = newPrice || product.price
        product.category = newCategory || product.category

    }
    res.status(200).send("Produto atualizado com sucesso")
})
