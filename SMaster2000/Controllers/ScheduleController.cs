using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;
using SMaster2000.Domain;
using SMaster2000.Models;

namespace SMaster2000.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ScheduleController : Controller
    {
        private readonly IUserService _userService;

        public ScheduleController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        [Route("[action]")]
        public void CreateSchedule([FromForm]string scheduleTitle, [FromForm]string scheduleNumOfDays)
        {
            //_userService.valamilogikaxd();   add schedule to database logika
            var username = HttpContext.User.Claims.First(c => c.Type == ClaimTypes.Email).Value;
            int userId = _userService.GetUserByName(username);
            _userService.CreateSchedule(userId, scheduleNumOfDays, scheduleTitle);
            _userService.CreateUserActivity(userId, "Created a schedule");
        }

        

        [Authorize]
        [HttpGet]
        [Route("[action]")]
        public void ShowScheduleCreate()
        {
            // checking if the user is logged in. If the user is not logged in, it will return 405 status code.
        }

        [Authorize]
        [HttpGet]
        [Route("[action]")]
        public List<ScheduleModel> ShowMySchedules()
        {
            // checking if the user is logged in. If the user is not logged in, it will return 405 status code.
            var username = HttpContext.User.Claims.First(c => c.Type == ClaimTypes.Email).Value;
            return _userService.GetScheduleForUser(username);
        }
        [HttpGet]
        [Route("[action]")]
        public List<ScheduleModel> ShowAllSchedules()
        {
            // checking if the user is logged in. If the user is not logged in, it will return 405 status code.
            
            return _userService.GetAllSchedules();
        }
    }
}