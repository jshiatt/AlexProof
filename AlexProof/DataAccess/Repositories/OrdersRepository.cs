using Domain.Entities;
using Domain.Interfaces;
using Domain.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repositories
{
    public class OrdersRepository : GenericRepository<Order>, IOrdersRepository
    {
        public OrdersRepository(Context context, UserContext userContext) : base(context, userContext) { }

        public OrderDetailList FindOrders(FindOrders filters)
        {
            var orderQuery = _context.Set<Order>().Include(o => o.CreateUser).Include(o => o.UpdateUser).AsQueryable();

            if (!string.IsNullOrEmpty(filters.Search))
            {
                orderQuery = orderQuery.Where(w => w.CreateUser.UserName.ToLower().Contains(filters.Search.ToLower())
                    || w.UpdateUser.UserName.ToLower().Contains(filters.Search.ToLower())
                    || w.CustomerName.ToLower().Contains(filters.Search.ToLower()));
            }
            else if (filters.OrderType.HasValue)
            {
                orderQuery = orderQuery.Where(w => w.OrderType == filters.OrderType);
            }

            var results = orderQuery.Select(o => new OrderDetail
            {
                Id = o.Id,
                OrderType = o.OrderType,
                CustomerName = o.CustomerName,
                CreateDateTime = o.CreateDateTime,
                CreateUser = o.CreateUser.UserName,
                UpdateDateTime = o.UpdateDateTime,
                UpdateUser = o.UpdateUser.UserName
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
                CreateDateTime = DateTime.Now,
                CreateUserId = _userContext.CurrentUser.Id
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
                CreateDateTime = newOrder.CreateDateTime,
                CreateUser = _userContext.CurrentUser.UserName
            };
        }

        public OrderDetail UpdateOrder(Guid id, UpdateOrder command)
        {
            Order existing = _context.Set<Order>().Include(o => o.CreateUser).Include(o => o.UpdateUser).FirstOrDefault(f => f.Id == id);
            if (existing == null)
            {
                throw new Exception("Order does not exist");
            }

            existing.OrderType = command.OrderType ?? existing.OrderType;
            existing.CustomerName = command.CustomerName ?? existing.CustomerName;
            existing.UpdateDateTime = DateTime.Now;
            existing.UpdateUserId = _userContext.CurrentUser.Id;

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
                CreateUser = existing.CreateUser.UserName,
                UpdateDateTime = existing.UpdateDateTime,
                UpdateUser = _userContext.CurrentUser.UserName
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
