using Domain.Interfaces;
using Domain.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AlexProof.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly IOrdersRepository _orderRepository;
        public OrdersController(IOrdersRepository ordersRepository)
        {
            _orderRepository = ordersRepository;
        }

        [HttpPost]
        [Route("search")]
        public OrderDetailList FindOrders([FromBody] FindOrders filters)
        {
            return _orderRepository.FindOrders(filters);
        }

        [HttpPost]
        public OrderDetail CreateOrder([FromBody] CreateOrder command)
        {
            return _orderRepository.CreateOrder(command);
        }
    }
}
