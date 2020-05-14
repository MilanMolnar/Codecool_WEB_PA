using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SMaster2000.Domain;
using SMaster2000.Models;

namespace SMaster2000.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AdminController : Controller
    {
        private readonly IUserService _userService;

        public AdminController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        [Route("[action]")]
        public List<UserActivityModel> ShowUserActivities()
        {
            var username = HttpContext.User.Claims.First(c => c.Type == ClaimTypes.Email).Value;
            return _userService.GetAllUserActivity();
        }

    }
}