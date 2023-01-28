using Domain.Entities;
using Domain.Interfaces;
using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repositories
{
    public class OrdersRepository : GenericRepository<Order>, IOrdersRepository
    {
        public OrdersRepository(Context context) : base(context) { }

        public OrderDetailList FindOrders(FindOrders filters)
        {
            var orderQuery = _context.Set<Order>().AsQueryable();

            if (filters.OrderType.HasValue)
            {
                orderQuery = orderQuery.Where(w => w.OrderType == filters.OrderType);
            }

            var results = orderQuery.Select(o => new OrderDetail
            {
                Id = o.Id,
                OrderType = o.OrderType,
                CustomerName = o.CustomerName,
                CreateDateTime = o.CreateDateTime
            }).OrderByDescending(obd => obd.CreateDateTime)
            .Skip((filters.Page - 1) * filters.PageSize).Take(filters.PageSize)
            .ToList();

            return new OrderDetailList
            {
                Orders = results,
                Total = orderQuery.Count()
            };
        }

        public OrderDetail CreateOrder(CreateOrder command)
        {
            Order newOrder = new Order
            {
                Id = Guid.NewGuid(),
                OrderType = command.OrderType,
                CustomerName = command.CustomerName,
                CreateDateTime = DateTime.Now
            };

            Add(newOrder);

            _context.SaveChanges();

            Order createdOrder = GetById(newOrder.Id);

            if (createdOrder != null)
            {
                return new OrderDetail
                {
                    Id = createdOrder.Id,
                    OrderType = createdOrder.OrderType,
                    CustomerName = createdOrder.CustomerName,
                    CreateDateTime = createdOrder.CreateDateTime
                };
            }

            throw new Exception("Failed to create order");
        }
    }
}
