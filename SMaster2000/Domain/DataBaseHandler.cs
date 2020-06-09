using Microsoft.Extensions.ObjectPool;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Runtime.InteropServices.ComTypes;
using System.Threading.Tasks;
using NewsMaster3000.Models;
using NewsMaster3000.Domain;

namespace NewsMaster3000.Domain
{
    public class DataBaseHandler : IUserService
    {
        public static readonly string connectingString = $"Host=localhost;Username=postgres;Password=admin;Database=NewsMaster3000";

        public bool Login(string username, string password)
        {
            string user_name = "";
            string user_password = "";
            using (var conn = new NpgsqlConnection(connectingString))
            {
                conn.Open();
                using (var command = new NpgsqlCommand($"SELECT user_name, user_password FROM users WHERE user_name='{username}' AND user_password='{password}'", conn))
                {
                    var reader = command.ExecuteReader();

                    while (reader.Read())
                    {
                        user_name = Convert.ToString(reader["user_name"]);
                        user_password = Convert.ToString(reader["user_password"]);
                    }
                }
                conn.Close();
            }

            if (user_name != "" && user_password != "")
            {
                return true;
            }
            return false;
        }

        public void Register(string username, string password, string usertype)
        {

            using (var conn = new NpgsqlConnection(connectingString))
            {
                conn.Open();
                var command = new NpgsqlCommand($"INSERT INTO users(user_name,user_password,is_admin) VALUES ('{username}','{password}','{usertype}')", conn);
                command.ExecuteNonQuery();
                conn.Close();
            }
        }

        public string SubscribeUser(string author, string subscriber)
        {
            int author_id = GetUserByName(author);
            int subscribe_id = GetUserByName(subscriber);
            try
            {
                using (var conn = new NpgsqlConnection(connectingString))
                {
                    conn.Open();
                    var command = new NpgsqlCommand($"INSERT INTO subscribe(subscriber_id, author_id) VALUES ('{subscribe_id}','{author_id}')", conn);
                    command.ExecuteNonQuery();
                    conn.Close();
                }
            }
            catch (Exception)
            {
                return "NoMoreSubscribe";
            }
            return "Subscribed";
            

        }

        public void UnSubscribeUser(string author, string subscriber)
        {
            int author_id = GetUserByName(author);
            int subscribe_id = GetUserByName(subscriber);
            using (var conn = new NpgsqlConnection(connectingString))
            {
                conn.Open();
                var command = new NpgsqlCommand($"DELETE FROM Subscribe WHERE subscriber_id = '{subscribe_id}' AND  author_id = '{author_id}'", conn);
                command.ExecuteNonQuery();
                conn.Close();
            }

        }


        public int GetUserByName(string userName)
        {
            int user_id = 0;
            using (var conn = new NpgsqlConnection(connectingString))
            {
                conn.Open();
                using (var command = new NpgsqlCommand($"SELECT user_id FROM users WHERE user_name='{userName}'", conn))
                {
                    var reader = command.ExecuteReader();

                    while (reader.Read())
                    {
                        user_id = Convert.ToInt32(reader["user_id"]);
                    }
                }
                conn.Close();
            }
            return user_id;
        }

        public void CreateNews(int userId, string newsTitle, string newsContent, string publishedDate, string author)
        {
            using (var conn = new NpgsqlConnection(connectingString))
            {
                conn.Open();
                var command = new NpgsqlCommand($"INSERT INTO news(user_id,news_title,news_content,news_author,news_published_date) VALUES ('{userId}','{newsTitle}','{newsContent}','{author}', '{publishedDate}')", conn);
                command.ExecuteNonQuery();
                conn.Close();
            }
        }


        public bool IsAdmin(string username)
        {
            var is_admin = "";
            using (var conn = new NpgsqlConnection(connectingString))
            {
                conn.Open();
                using (var command = new NpgsqlCommand($"SELECT is_admin FROM users WHERE user_name = '{username}'", conn))
                {
                    var reader = command.ExecuteReader();

                    while (reader.Read())
                    {
                        is_admin = Convert.ToString(reader["is_admin"]);
                    }
                }
                conn.Close();
            }

            if (is_admin == "admin")
            {
                return true;
            }
            return false;
        }

        public List<string> GetAllAuthors()
        {
            List<string> authors = new List<string>();
            using (var conn = new NpgsqlConnection(connectingString))
            {
                conn.Open();
                using (var command = new NpgsqlCommand($"SELECT user_name FROM users WHERE is_admin = 'admin'", conn))
                {
                    var reader = command.ExecuteReader();

                    while (reader.Read())
                    {
                        authors.Add(Convert.ToString(reader["user_name"]));
                    }
                }
                conn.Close();
            }
            return authors;
        }
        public List<NewsModel> GetAllNews()
        {
            List<NewsModel> usernews = new List<NewsModel>();

            using (var conn = new NpgsqlConnection(connectingString))
            {
                conn.Open();
                using (var command = new NpgsqlCommand($"SELECT * FROM news", conn))
                {
                    var reader = command.ExecuteReader();

                    while (reader.Read())
                    {
                        NewsModel newsModel = new NewsModel();
                        var news_id = Convert.ToInt32(reader["news_id"]);
                        var user_id = Convert.ToInt32(reader["user_id"]);
                        var news_title = Convert.ToString(reader["news_title"]);
                        var news_content = Convert.ToString(reader["news_content"]);
                        var news_author = Convert.ToString(reader["news_author"]);
                        var news_published_date = Convert.ToString(reader["news_published_date"]);

                        newsModel = new NewsModel(user_id, news_id, news_title, news_content, news_author, news_published_date);
                        usernews.Add(newsModel);
                    }
                }
                conn.Close();
            }
            return usernews;
        }

    }
}