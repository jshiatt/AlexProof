using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess
{
    public class UserContext
    {
        public User CurrentUser { get; private set; }

        public void Intialize(User user)
        {
            CurrentUser = user;
        }
    }
}
