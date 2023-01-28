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
                CreateDateTime = o.CreateDateTime,
                UpdateDateTime = o.UpdateDateTime
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

            if (_context.SaveChanges() == 0)
            {
                throw new Exception("Failed to create order");
            }

            return new OrderDetail
            {
                Id = newOrder.Id,
                OrderType = newOrder.OrderType,
                CustomerName = newOrder.CustomerName,
                CreateDateTime = newOrder.CreateDateTime
            };
        }

        public OrderDetail UpdateOrder(Guid id, UpdateOrder command)
        {
            Order existing = GetById(id);
            if (existing == null)
            {
                throw new Exception("Order does not exist");
            }

            existing.OrderType = command.OrderType ?? existing.OrderType;
            existing.CustomerName = command.CustomerName ?? existing.CustomerName;
            existing.UpdateDateTime = DateTime.Now;

            if (_context.SaveChanges() == 0)
            {
                throw new Exception("Failed to update order");
            }

            return new OrderDetail
            {
                Id = existing.Id,
                OrderType = existing.OrderType,
                CustomerName = existing.CustomerName,
                CreateDateTime = existing.CreateDateTime,
                UpdateDateTime = existing.UpdateDateTime
            };
        }

        public void DeleteOrder(Guid id)
        {
            Order existing = GetById(id);
            if (existing == null)
            {
                throw new Exception("Order does not exist");
            }

            _context.Remove(existing);

            if (_context.SaveChanges() == 0)
            {
                throw new Exception("Unable to delete order");
            }
        }
    }
}
