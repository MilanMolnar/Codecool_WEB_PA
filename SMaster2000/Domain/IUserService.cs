using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NewsMaster3000.Models;

namespace NewsMaster3000.Domain
{
    public interface IUserService
    {
        public bool Login(string username, string password);
        public void Register(string username, string password, string usertype);
        public bool IsAdmin(string username);
        public int GetUserByName(string userName);
        public void CreateNews(int userId, string newsTitle, string newsContent, string publishedDate, string author);
        public List<NewsModel> GetAllNews();
        public List<string> GetAllAuthors();
        public string SubscribeUser(string author, string subscriber);
        public void UnSubscribeUser(string author,string subscriber);

    }
}