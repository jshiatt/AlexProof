using Domain.Interfaces;
using Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AlexProof.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly IUsersRepository _usersRepository;

        public LoginController(IUsersRepository usersRepository)
        {
            _usersRepository = usersRepository;
        }

        [HttpPost]
        [Route("createUser")]
        [AllowAnonymous]
        public UserLogin CreateUser([FromBody] CreateUser command)
        {
            return _usersRepository.CreateUser(command);
        }

        [HttpPost]
        [AllowAnonymous]
        public UserLogin Login([FromBody] CreateUser command)
        {
            return _usersRepository.Login(command);
        }
    }
}
