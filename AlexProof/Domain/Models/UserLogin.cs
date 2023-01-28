using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class UserLogin
    {
        public string UserName { get; set; }
        public string Token { get; set; }
    }

    public class CreateUser
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}
