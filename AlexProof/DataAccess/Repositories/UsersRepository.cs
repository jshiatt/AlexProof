using Domain.Entities;
using Domain.Interfaces;
using Domain.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repositories
{
    public class UsersRepository : GenericRepository<User>, IUsersRepository
    {
        private readonly IConfiguration _configuration;
        public UsersRepository(Context context, IConfiguration configuration) : base(context)
        {
            _configuration = configuration;
        }

        public string GetRandomString(int length)
        {
            Random random = new Random();
            string chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";
            string str = new string(Enumerable.Repeat(chars, length)
                .Select(s => s[random.Next(s.Length)])
                .ToArray());
            return str;
        }

        public string GetToken(string userName)
        {
            var issuer = _configuration["Jwt:Issuer"];
            var audience = _configuration["Jwt:Audience"];
            var key = Encoding.ASCII.GetBytes
            (_configuration["Jwt:Key"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                new Claim("Id", Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Sub, userName),
                new Claim(JwtRegisteredClaimNames.Email, userName),
                new Claim(JwtRegisteredClaimNames.Jti,
                Guid.NewGuid().ToString())
             }),
                Expires = DateTime.UtcNow.AddMinutes(5),
                Issuer = issuer,
                Audience = audience,
                SigningCredentials = new SigningCredentials
                (new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha512Signature)
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var jwtToken = tokenHandler.WriteToken(token);
            var stringToken = tokenHandler.WriteToken(token);
            return stringToken;
        }

        public string GetHashedPassword(string input)
        {
            SHA256 sha256 = SHA256.Create();
            byte[] bytes = sha256.ComputeHash(Encoding.Unicode.GetBytes(input));
            StringBuilder builder = new StringBuilder();
            for (int i = 0; i < bytes.Length; i++)
            {
                builder.Append(bytes[i].ToString("x2"));
            }
            return builder.ToString();
        }

        public UserLogin CreateUser(CreateUser command)
        {
            var existing = _context.Set<User>().FirstOrDefault(f => f.UserName == command.UserName);
            if (existing != null)
            {
                throw new Exception("User already exists with given username");
            }

            var salt = GetRandomString(20);
            var hashedPasword = GetHashedPassword(command.Password + salt);

            User newUser = new User
            {
                Id = Guid.NewGuid(),
                UserName = command.UserName,
                PasswordHash = hashedPasword,
                PasswordSalt = salt
            };
            Add(newUser);
            if (_context.SaveChanges() == 0)
            {
                throw new Exception("Unable to create user");
            }

            var stringToken = GetToken(newUser.UserName);

            return new UserLogin
            {
                UserName = newUser.UserName,
                Token = stringToken
            };
        }

        public UserLogin Login(CreateUser command)
        {
            var user = _context.Set<User>().FirstOrDefault(f => f.UserName == command.UserName);
            if (user == null)
            {
                throw new Exception("User does not exist");
            }

            var calcHash = GetHashedPassword(command.Password + user.PasswordSalt);

            if (calcHash != user.PasswordHash)
            {
                throw new Exception("Invalid login credentials");
            }

            var token = GetToken(user.UserName);
            return new UserLogin
            {
                UserName = user.UserName,
                Token = token
            };
        }
    }
}
