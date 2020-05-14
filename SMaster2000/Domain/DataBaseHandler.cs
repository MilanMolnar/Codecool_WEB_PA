using Microsoft.Extensions.ObjectPool;
using Npgsql;
using SMaster2000.Models;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Runtime.InteropServices.ComTypes;
using System.Threading.Tasks;

namespace SMaster2000.Domain
{
    public class DataBaseHandler :IUserService
    {
        public static readonly string connectingString = $"Host=localhost;Username=postgres;Password=admin;Database=ScheduleMaster2000";

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

        public void Register(string username, string password,string usertype)
        {
            
            using (var conn = new NpgsqlConnection(connectingString))
            {
                conn.Open();
                var command = new NpgsqlCommand($"INSERT INTO users(user_name,user_password,is_admin) VALUES ('{username}','{password}','{usertype}')",conn);
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

        public void CreateSchedule(int userId,string scheduleNumOfDays, string scheduleTitle)
        {
            using (var conn = new NpgsqlConnection(connectingString))
            {
                conn.Open();
                var command = new NpgsqlCommand($"INSERT INTO schedule(user_id,schedule_title,number_of_days) VALUES ('{userId}','{scheduleTitle}','{scheduleNumOfDays}')", conn);
                command.ExecuteNonQuery();
                conn.Close();
            }
        }

        public void CreateUserActivity(int userId, string activity)
        {
            using (var conn = new NpgsqlConnection(connectingString))
            {
                conn.Open();
                var command = new NpgsqlCommand($"INSERT INTO userlog(user_id,user_activity) VALUES ('{userId}','{activity}')", conn);
                command.ExecuteNonQuery();
                conn.Close();
            }
        }

        public List<ScheduleModel> GetScheduleForUser(string username)
        {
            List<ScheduleModel> userschedules = new List<ScheduleModel>();

            int userid = GetUserByName(username);

            using (var conn = new NpgsqlConnection(connectingString))
            {
                conn.Open();
                using (var command = new NpgsqlCommand($"SELECT * FROM schedule WHERE user_id = {userid}", conn))
                {
                    var reader = command.ExecuteReader();

                    while (reader.Read())
                    {
                        ScheduleModel scheduleModel = new ScheduleModel();
                        var schedule_id = Convert.ToInt32(reader["schedule_id"]);
                        var user_id = Convert.ToInt32(reader["user_id"]);
                        var schedule_title = Convert.ToString(reader["schedule_title"]);
                        var number_of_days = Convert.ToInt32(reader["number_of_days"]);

                        scheduleModel = new ScheduleModel(user_id, schedule_title, number_of_days);
                        userschedules.Add(scheduleModel);
                    }
                }
                conn.Close();
            }
            return userschedules;
        }

        public List<ScheduleModel> GetAllSchedules()
        {
            List<ScheduleModel> userschedules = new List<ScheduleModel>();

            using (var conn = new NpgsqlConnection(connectingString))
            {
                conn.Open();
                using (var command = new NpgsqlCommand($"SELECT * FROM schedule", conn))
                {
                    var reader = command.ExecuteReader();

                    while (reader.Read())
                    {
                        ScheduleModel scheduleModel = new ScheduleModel();
                        var schedule_id = Convert.ToInt32(reader["schedule_id"]);
                        var user_id = Convert.ToInt32(reader["user_id"]);
                        var schedule_title = Convert.ToString(reader["schedule_title"]);
                        var number_of_days = Convert.ToInt32(reader["number_of_days"]);

                        scheduleModel = new ScheduleModel(user_id, schedule_title, number_of_days);
                        userschedules.Add(scheduleModel);
                    }
                }
                conn.Close();
            }
            return userschedules;
        }


        public List<UserActivityModel> GetAllUserActivity()
        {
            List<UserActivityModel> activityModels = new List<UserActivityModel>();
            using (var conn = new NpgsqlConnection(connectingString))
            {
                conn.Open();
                using (var command = new NpgsqlCommand($"SELECT * FROM users", conn))
                {
                    var reader = command.ExecuteReader();

                    while (reader.Read())
                    {
                        UserActivityModel userActivity = new UserActivityModel();
                        var user_id = Convert.ToInt32(reader["user_id"]);
                        var user_activity = Convert.ToString(reader["user_activity"]);
                        userActivity = new UserActivityModel(user_id, user_activity);
                        activityModels.Add(userActivity);
                    }
                }
                conn.Close();
            }
            return activityModels;
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
    }
}
