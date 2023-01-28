using Domain.Entities;
using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces
{
    public interface IOrdersRepository : IGenericRepository<Order>
    {
        OrderDetailList FindOrders(FindOrders filters);
        OrderDetail CreateOrder(CreateOrder command);
        OrderDetail UpdateOrder(Guid id, UpdateOrder command);
        void DeleteOrder(Guid id);
    }
}
