using Domain.Entities;
using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces
{
    public interface IUsersRepository : IGenericRepository<User>
    {
        UserLogin CreateUser(CreateUser command);
        UserLogin Login(CreateUser command);
        string GetCurrentUser();
    }
}
