"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
let OrdersService = class OrdersService {
    orders = [
        {
            orderId: "ORD-1001",
            date: "2023-01-05T14:32:00",
            customer: "João Silva",
            status: "Entregue",
            amount: 245.90,
            items: 3,
            payment: "Cartão"
        },
        {
            orderId: "ORD-1002",
            date: "2023-01-05T10:15:00",
            customer: "Maria Souza",
            status: "Processando",
            amount: 189.50,
            items: 2,
            payment: "PIX"
        },
        {
            orderId: "ORD-1003",
            date: "2023-01-04T18:45:00",
            customer: "Carlos Oliveira",
            status: "Enviado",
            amount: 320.75,
            items: 5,
            payment: "Cartão"
        },
        {
            orderId: "ORD-1004",
            date: "2023-01-04T09:22:00",
            customer: "Ana Santos",
            status: "Cancelado",
            amount: 95.30,
            items: 1,
            payment: "Boleto"
        },
        {
            orderId: "ORD-1005",
            date: "2023-01-03T16:10:00",
            customer: "Pedro Costa",
            status: "Entregue",
            amount: 420.00,
            items: 4,
            payment: "Cartão"
        },
        {
            orderId: "ORD-1006",
            date: "2023-01-03T12:30:00",
            customer: "Fernanda Lima",
            status: "Processando",
            amount: 156.80,
            items: 2,
            payment: "PIX"
        },
        {
            orderId: "ORD-1007",
            date: "2023-01-02T20:15:00",
            customer: "Roberto Alves",
            status: "Entregue",
            amount: 289.45,
            items: 3,
            payment: "Cartão"
        },
        {
            orderId: "ORD-1008",
            date: "2023-01-02T15:45:00",
            customer: "Lucia Ferreira",
            status: "Enviado",
            amount: 178.90,
            items: 1,
            payment: "Boleto"
        },
        {
            orderId: "ORD-1009",
            date: "2023-01-02T11:20:00",
            customer: "Marcos Santos",
            status: "Cancelado",
            amount: 345.60,
            items: 4,
            payment: "Cartão"
        },
        {
            orderId: "ORD-1010",
            date: "2023-01-01T19:30:00",
            customer: "Patricia Costa",
            status: "Entregue",
            amount: 210.25,
            items: 2,
            payment: "PIX"
        },
        {
            orderId: "ORD-1011",
            date: "2023-01-01T16:45:00",
            customer: "Ricardo Silva",
            status: "Processando",
            amount: 432.10,
            items: 5,
            payment: "Cartão"
        },
        {
            orderId: "ORD-1012",
            date: "2023-01-01T13:20:00",
            customer: "Camila Oliveira",
            status: "Enviado",
            amount: 167.80,
            items: 3,
            payment: "Boleto"
        },
        {
            orderId: "ORD-1013",
            date: "2022-12-31T21:15:00",
            customer: "Diego Martins",
            status: "Entregue",
            amount: 298.75,
            items: 4,
            payment: "Cartão"
        },
        {
            orderId: "ORD-1014",
            date: "2022-12-31T18:30:00",
            customer: "Juliana Lima",
            status: "Processando",
            amount: 145.90,
            items: 2,
            payment: "PIX"
        },
        {
            orderId: "ORD-1015",
            date: "2022-12-31T14:45:00",
            customer: "Thiago Souza",
            status: "Cancelado",
            amount: 376.40,
            items: 6,
            payment: "Cartão"
        },
        {
            orderId: "ORD-1016",
            date: "2022-12-31T10:20:00",
            customer: "Amanda Costa",
            status: "Entregue",
            amount: 223.60,
            items: 3,
            payment: "Boleto"
        },
        {
            orderId: "ORD-1017",
            date: "2022-12-30T22:10:00",
            customer: "Bruno Alves",
            status: "Enviado",
            amount: 189.30,
            items: 2,
            payment: "PIX"
        },
        {
            orderId: "ORD-1018",
            date: "2022-12-30T19:25:00",
            customer: "Vanessa Santos",
            status: "Processando",
            amount: 456.80,
            items: 7,
            payment: "Cartão"
        },
        {
            orderId: "ORD-1019",
            date: "2022-12-30T15:40:00",
            customer: "Leonardo Ferreira",
            status: "Entregue",
            amount: 134.50,
            items: 1,
            payment: "Boleto"
        },
        {
            orderId: "ORD-1020",
            date: "2022-12-30T12:55:00",
            customer: "Gabriela Lima",
            status: "Cancelado",
            amount: 267.90,
            items: 4,
            payment: "Cartão"
        },
        {
            orderId: "ORD-1021",
            date: "2022-12-30T09:10:00",
            customer: "Rafael Silva",
            status: "Enviado",
            amount: 198.75,
            items: 3,
            payment: "PIX"
        },
        {
            orderId: "ORD-1022",
            date: "2022-12-29T23:30:00",
            customer: "Carolina Costa",
            status: "Entregue",
            amount: 312.45,
            items: 5,
            payment: "Cartão"
        },
        {
            orderId: "ORD-1023",
            date: "2022-12-29T20:45:00",
            customer: "Andre Martins",
            status: "Processando",
            amount: 167.20,
            items: 2,
            payment: "Boleto"
        },
        {
            orderId: "ORD-1024",
            date: "2022-12-29T17:00:00",
            customer: "Isabela Oliveira",
            status: "Cancelado",
            amount: 445.60,
            items: 6,
            payment: "Cartão"
        },
        {
            orderId: "ORD-1025",
            date: "2022-12-29T13:15:00",
            customer: "Felipe Souza",
            status: "Enviado",
            amount: 234.80,
            items: 4,
            payment: "PIX"
        },
        {
            orderId: "ORD-1026",
            date: "2022-12-29T09:30:00",
            customer: "Mariana Lima",
            status: "Entregue",
            amount: 178.90,
            items: 2,
            payment: "Cartão"
        },
        {
            orderId: "ORD-1027",
            date: "2022-12-28T21:45:00",
            customer: "Gustavo Alves",
            status: "Processando",
            amount: 389.75,
            items: 5,
            payment: "Boleto"
        },
        {
            orderId: "ORD-1028",
            date: "2022-12-28T18:00:00",
            customer: "Beatriz Santos",
            status: "Cancelado",
            amount: 156.40,
            items: 3,
            payment: "Cartão"
        },
        {
            orderId: "ORD-1029",
            date: "2022-12-28T14:15:00",
            customer: "Lucas Ferreira",
            status: "Enviado",
            amount: 267.30,
            items: 4,
            payment: "PIX"
        },
        {
            orderId: "ORD-1030",
            date: "2023-03-01T10:00:00",
            customer: "Ana Paula Silva",
            status: "Entregue",
            amount: 189.50,
            items: 2,
            payment: "Cartão"
        },
        {
            orderId: "ORD-1031",
            date: "2023-03-02T14:30:00",
            customer: "Carlos Eduardo",
            status: "Processando",
            amount: 320.75,
            items: 4,
            payment: "PIX"
        },
        {
            orderId: "ORD-1032",
            date: "2023-03-03T16:45:00",
            customer: "Maria Fernanda",
            status: "Enviado",
            amount: 156.80,
            items: 1,
            payment: "Boleto"
        },
        {
            orderId: "ORD-1033",
            date: "2023-03-04T09:15:00",
            customer: "João Pedro",
            status: "Entregue",
            amount: 445.60,
            items: 6,
            payment: "Cartão"
        },
        {
            orderId: "ORD-1034",
            date: "2023-03-05T11:20:00",
            customer: "Fernanda Costa",
            status: "Cancelado",
            amount: 234.80,
            items: 3,
            payment: "PIX"
        },
        {
            orderId: "ORD-1035",
            date: "2023-03-06T13:40:00",
            customer: "Roberto Santos",
            status: "Entregue",
            amount: 178.90,
            items: 2,
            payment: "Cartão"
        },
        {
            orderId: "ORD-1036",
            date: "2023-03-07T15:55:00",
            customer: "Lucia Oliveira",
            status: "Processando",
            amount: 389.75,
            items: 5,
            payment: "Boleto"
        },
        {
            orderId: "ORD-1037",
            date: "2023-03-08T17:30:00",
            customer: "Marcos Lima",
            status: "Enviado",
            amount: 267.30,
            items: 4,
            payment: "Cartão"
        },
        {
            orderId: "ORD-1038",
            date: "2023-03-09T19:45:00",
            customer: "Patricia Alves",
            status: "Entregue",
            amount: 156.40,
            items: 1,
            payment: "PIX"
        },
        {
            orderId: "ORD-1039",
            date: "2023-03-10T21:10:00",
            customer: "Ricardo Ferreira",
            status: "Processando",
            amount: 312.45,
            items: 3,
            payment: "Cartão"
        },
        {
            orderId: "ORD-1040",
            date: "2023-03-31T23:59:00",
            customer: "Camila Martins",
            status: "Entregue",
            amount: 198.75,
            items: 2,
            payment: "Boleto"
        }
    ];
    getOrders(filters) {
        let filteredOrders = [...this.orders];
        if (filters.startDate) {
            const startDate = new Date(filters.startDate + 'T00:00:00');
            filteredOrders = filteredOrders.filter(order => {
                const orderDate = new Date(order.date);
                return orderDate >= startDate;
            });
        }
        if (filters.endDate) {
            const endDate = new Date(filters.endDate + 'T23:59:59');
            filteredOrders = filteredOrders.filter(order => {
                const orderDate = new Date(order.date);
                return orderDate <= endDate;
            });
        }
        if (filters.statuses && filters.statuses.length > 0) {
            filteredOrders = filteredOrders.filter(order => filters.statuses.includes(order.status));
        }
        if (filters.paymentMethods && filters.paymentMethods.length > 0) {
            filteredOrders = filteredOrders.filter(order => filters.paymentMethods.includes(order.payment));
        }
        if (filters.minAmount) {
            filteredOrders = filteredOrders.filter(order => order.amount >= filters.minAmount);
        }
        if (filters.maxAmount) {
            filteredOrders = filteredOrders.filter(order => order.amount <= filters.maxAmount);
        }
        return {
            data: filteredOrders,
            timeRange: {
                start: filters.startDate,
                end: filters.endDate
            }
        };
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)()
], OrdersService);
//# sourceMappingURL=orders.service.js.map