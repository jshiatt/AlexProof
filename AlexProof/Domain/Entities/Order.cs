﻿using Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Order
    {
        public Guid Id { get; set; }
        public OrderType OrderType { get; set; }
        public string CustomerName { get; set; }
        public DateTime CreateDateTime { get; set; }
    }
}
