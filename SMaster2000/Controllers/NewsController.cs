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
using NewsMaster3000.Domain;
using NewsMaster3000.Models;

namespace NewsMaster3000.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NewsController : Controller
    {
        private readonly IUserService _userService;

        public NewsController(IUserService userService)
        {
            _userService = userService;
        }

        [Authorize]
        [HttpPost]
        [Route("[action]")]
        public void CreateNews([FromForm]string newsTitle, [FromForm]string author, [FromForm]string newsContent, [FromForm]string publishedDate)
        {
            //_userService.valamilogikaxd();   add schedule to database logika
            var username = HttpContext.User.Claims.First(c => c.Type == ClaimTypes.Email).Value;
            int userId = _userService.GetUserByName(username);
            _userService.CreateNews(userId, newsTitle, newsContent, publishedDate, author);
        }

        [Authorize]
        [HttpPost]
        [Route("[action]")]
        public IActionResult SubscribeUser([FromForm]string author, [FromForm]string subscriber)
        {
            var response = Json(_userService.SubscribeUser(author, subscriber));
            return response;
        }

        [Authorize]
        [HttpPost]
        [Route("[action]")]
        public void UnSubscribeUser([FromForm]string author, [FromForm]string subscriber)
        {
            _userService.UnSubscribeUser(author, subscriber);
        }

        [Authorize]
        [HttpGet]
        [Route("[action]")]
        public void AllNews()
        {
            //Checking if the user is logged in and acting accordingly
        }

        [Authorize]
        [HttpGet]
        [Route("[action]")]
        public void ShowNewsCreate()
        {
            // checking if the user is logged in. If the user is not logged in, it will return 405 status code.
        }
        [Authorize]
        [HttpGet]
        [Route("[action]")]
        public List<string> GetAuthors()
        {
            return _userService.GetAllAuthors();
            // checking if the user is logged in. If the user is not logged in, it will return 405 status code.
        }

        [Authorize]
        [HttpGet]
        [Route("[action]")]
        public List<NewsModel> ShowAllNews()
        {
            // checking if the user is logged in. If the user is not logged in, it will return 405 status code.

            return _userService.GetAllNews();
        }
    }
}