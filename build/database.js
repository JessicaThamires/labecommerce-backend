"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchase = exports.products = exports.users = void 0;
exports.users = [{
        id: "00",
        email: "chevet@gmail.com",
        password: "chevet00"
    }, {
        id: "01",
        email: "corsa@gmail.com",
        password: "corsa01"
    }, {
        id: "02",
        email: "celtaa@gmail.com",
        password: "celta02"
    }];
exports.products = [{
        id: "00",
        name: "Lavagem simples",
        price: 30,
        category: "Limpeza"
    }, {
        id: "01",
        name: "Lavagem com cera",
        price: 40,
        category: "Limpeza"
    },
    {
        id: "03",
        name: "Cristalização",
        price: 120,
        category: "Estética"
    }];
exports.purchase = [{
        userId: "00",
        productId: "01",
        quantity: 1,
        totalPrice: 40
    }];
//# sourceMappingURL=database.js.map