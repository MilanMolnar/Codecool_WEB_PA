using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using NewsMaster3000.Domain;

namespace NewsMaster3000.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IUserService _userService;

        public AccountController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        [Route("[action]")]
        public void Register([FromForm]string username, [FromForm]string password)
        {
            _userService.Register(username, password, "user");
            int id = _userService.GetUserByName(username);
        }

        [HttpGet]
        [Route("[action]")]
        public async void Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        }

        

        [HttpPost]
        [Route("[action]")]
        public async Task<string> LoginAsync([FromForm]string username, [FromForm]string password)
        {
            var claims = new List<Claim>
                {
                new Claim(ClaimTypes.Email, username)
                };

            var claimsIdentity = new ClaimsIdentity(
                claims, CookieAuthenticationDefaults.AuthenticationScheme);

            var authProperties = new AuthenticationProperties{};

            await HttpContext.SignInAsync(
                CookieAuthenticationDefaults.AuthenticationScheme,
                new ClaimsPrincipal(claimsIdentity),
                authProperties);

            if (_userService.Login(username, password))
            {
                int id = _userService.GetUserByName(username);

                if (_userService.IsAdmin(username))
                {
                    // User admin
                    return "admin";
                }
                // User registered

                return username;
            }
            else
            {
                // Guest
                throw new System.Web.Http.HttpResponseException(HttpStatusCode.Unauthorized);
            }
        }
    }
}