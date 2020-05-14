using System;
using System.Collections.Generic;
using System.Linq;
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
            // checking if the user is logged in. If the user is not logged in, it will return 405 status code.

            return null;  //Method: get all user activity.
        }

    }
}