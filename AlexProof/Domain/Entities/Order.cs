using Domain.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
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
        public Guid CreateUserId { get; set; }
        public DateTime? UpdateDateTime { get; set; }
        public Guid? UpdateUserId { get; set; }
        [ForeignKey("CreateUserId")]
        public virtual User CreateUser { get; set; }
        [ForeignKey("UpdateUserId")]
        public virtual User UpdateUser { get; set; }
    }
}
